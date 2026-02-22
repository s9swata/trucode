const express = require("express");
const User = require("../models/User");
const Submissions = require("../models/Submissions");
const Aura = require("../models/Aura");
const Problem = require("../models/Problem");
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

router.get("/leaderboard", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    
    const topUsers = await Aura.find({})
      .sort({ aura: -1 })
      .limit(limit)
      .populate("user", "username full_name");
    
    const leaderboard = topUsers.map((entry, index) => ({
      rank: index + 1,
      username: entry.username,
      full_name: entry.user?.full_name || entry.username,
      aura: entry.aura,
    }));
    
    res.json(leaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:username/analytics", async (req, res) => {
  try {
    const { username } = req.params;
    
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const submissions = await Submissions.find({ username }).sort({ createdAt: -1 });
    
    const totalSubmissions = submissions.length;
    const acceptedSubmissions = submissions.filter(s => s.status === "accepted").length;
    const failedSubmissions = submissions.filter(s => s.status === "failed").length;
    const pendingSubmissions = submissions.filter(s => s.status === "pending").length;

    const submissionsByDate = {};
    submissions.forEach(sub => {
      const date = sub.createdAt.toISOString().split("T")[0];
      if (!submissionsByDate[date]) {
        submissionsByDate[date] = { total: 0, accepted: 0 };
      }
      submissionsByDate[date].total++;
      if (sub.status === "accepted") {
        submissionsByDate[date].accepted++;
      }
    });

    const submissionsByLanguage = {};
    submissions.forEach(sub => {
      const lang = sub.language_id;
      if (!submissionsByLanguage[lang]) {
        submissionsByLanguage[lang] = { total: 0, accepted: 0 };
      }
      submissionsByLanguage[lang].total++;
      if (sub.status === "accepted") {
        submissionsByLanguage[lang].accepted++;
      }
    });

    const languageNames = {
      50: "C",
      54: "C++",
      60: "Go",
      62: "Java",
      63: "JavaScript",
      71: "Python",
      72: "Ruby",
      73: "Rust",
      74: "TypeScript",
    };

    const languages = Object.entries(submissionsByLanguage).map(([id, data]) => ({
      language: languageNames[id] || `ID: ${id}`,
      ...data,
      acceptanceRate: data.total > 0 ? ((data.accepted / data.total) * 100).toFixed(1) : 0,
    }));

    const acceptedSubmissionsList = submissions.filter(s => s.status === "accepted");
    const problemsAttempted = [...new Set(acceptedSubmissionsList.map(s => s.problem_id))].length;
    
    const allProblems = await Problem.countDocuments();
    const problemsCompleted = problemsAttempted;
    const completionRate = allProblems > 0 ? ((problemsCompleted / allProblems) * 100).toFixed(1) : 0;

    const aura = await Aura.findOne({ user: user._id });

    res.json({
      overview: {
        totalSubmissions,
        acceptedSubmissions,
        failedSubmissions,
        pendingSubmissions,
        acceptanceRate: totalSubmissions > 0 ? ((acceptedSubmissions / totalSubmissions) * 100).toFixed(1) : 0,
        aura: aura?.aura || 0,
      },
      submissionsByDate: Object.entries(submissionsByDate)
        .map(([date, data]) => ({ date, ...data }))
        .sort((a, b) => a.date.localeCompare(b.date))
        .slice(-30),
      languages,
      problems: {
        attempted: problemsAttempted,
        completed: problemsCompleted,
        total: allProblems,
        completionRate,
      },
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
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
