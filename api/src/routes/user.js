const express = require("express");
const User = require("../models/User");
const Submissions = require("../models/Submissions");
const Aura = require("../models/Aura");
const router = express.Router();

router.post("/sync", async (req, res) => {
  const { clerkId, email, username, fullName } = req.body;
  
  if (!clerkId || !email || !username) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    let user = await User.findOne({ clerk_id: clerkId });
    
    if (user) {
      await User.updateOne(
        { clerk_id: clerkId },
        { $set: { username, email, full_name: fullName || username } }
      );
      return res.status(200).json({ message: "User updated", userId: user._id });
    }

    user = await User.create({
      username,
      email,
      full_name: fullName || username,
      clerk_id: clerkId,
    });

    const aura = await Aura.create({
      username,
      user: user._id,
      aura: 0,
    });

    await User.updateOne({ _id: user._id }, { $set: { aura: aura._id } });

    console.log(`User ${username} synced`);
    res.status(200).json({ message: "User created", userId: user._id });
  } catch (error) {
    console.error("Error syncing user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:username", async (req, res) => {
  try {
    const { username } = req.params;
    
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const totalSubmissions = await Submissions.countDocuments({ username });
    const acceptedSubmissions = await Submissions.countDocuments({ 
      username, 
      status: "accepted" 
    });
    
    const aura = await Aura.findOne({ user: user._id });

    const stats = {
      totalSubmissions,
      acceptedSubmissions,
      acceptanceRate: totalSubmissions > 0 
        ? ((acceptedSubmissions / totalSubmissions) * 100).toFixed(1) 
        : 0,
      aura: aura?.aura || 0,
    };

    res.json({
      user: {
        username: user.username,
        email: user.email,
        full_name: user.full_name,
        createdAt: user.createdAt,
      },
      stats,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
