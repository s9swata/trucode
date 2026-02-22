const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Submissions = require("../models/Submissions");
const Aura = require("../models/Aura");

router.post("/clerk", async (req, res) => {
  const { type, data } = req.body;
  
  if (type === "user.created" || type === "user.updated") {
    const userData = data;
    const email = userData.email_addresses?.[0]?.email_address;
    const username = userData.username || email?.split("@")[0] || `user_${userData.id}`;
    const fullName = `${userData.first_name || ""} ${userData.last_name || ""}`.trim() || username;
    const clerkId = userData.id;

    if (!email || !clerkId) {
      console.log("Missing required user data:", { email, clerkId });
      return res.status(400).json({ error: "Missing required user data" });
    }

    try {
      const existingUser = await User.findOne({ clerk_id: clerkId });
      
      if (existingUser) {
        await User.updateOne(
          { clerk_id: clerkId },
          { $set: { username, email, full_name: fullName } }
        );
        console.log(`User ${clerkId} updated`);
        return res.status(200).json({ message: "User updated" });
      }

      const user = await User.create({
        username,
        email,
        full_name: fullName,
        clerk_id: clerkId,
      });

      const aura = await Aura.create({
        username,
        user: user._id,
        aura: 0,
      });

      await User.updateOne({ _id: user._id }, { $set: { aura: aura._id } });

      console.log(`User ${username} created via webhook`);
      res.status(200).json({ message: "User created successfully", user });
    } catch (error) {
      console.error("Error in webhook:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(200).json({ message: "Event ignored" });
  }
});

router.post("/clerk/registered", async (req, res) => {
  const userData = req.body.data;
  const email = userData.email_addresses?.[0]?.email_address;
  const username = userData.username || email;
  const fullName = `${userData.first_name} ${userData.last_name}`;
  const clerkId = userData.id;

  if (!email || !username || !fullName || !clerkId) {
    res.status(400).json({ error: "Missing required user data" });
    return;
  }

  try {
    const existingUser = await User.findOne({ clerk_id: clerkId });
    if (existingUser) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    const user = await User.create({
      username: username,
      email: email,
      full_name: fullName,
      clerk_id: clerkId,
    });

    if (!user) {
      res.status(400).json({ error: "User creation failed" });
      return;
    }

    res.status(200).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
});

router.put("/judge", async (req, res) => {
  const token = req.body.token;
  try {
    const checkSubmissionInDb = await Submissions.findOne({
      token: token,
    });
    if (!checkSubmissionInDb) {
      console.log(`Submission with token ${token} not found in db`);
      return;
    }
    if (checkSubmissionInDb && checkSubmissionInDb.status === "accepted") {
      console.log(`Submission with token ${token} already marked as accepted`);
      return;
    }
    const status = req.body.status;
    if (status.description === "Accepted") {
      await Submissions.updateOne(
        { token: token },
        { $set: { status: "accepted" } },
      );
      await Aura.updateOne(
        { username: checkSubmissionInDb.username },
        { $inc: { aura: 1 } },
      );
      console.log(`Submission with token ${token} marked as accepted`);
    } else {
      await Submissions.updateOne(
        { token: token },
        { $set: { status: "failed" } },
      );
      console.log(`Submission with token ${token} marked as failed`);
    }
  } catch (e) {
    console.log(`Error updating submission status with token ${token}: ${e}`);
    return;
  }
});

module.exports = router;
