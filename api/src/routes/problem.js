const express = require("express");
const Problem = require("../models/Problem");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { difficulty, tags, search } = req.query;
    
    const filter = {};
    
    if (difficulty && difficulty !== "All") {
      filter.difficulty = difficulty;
    }
    
    if (tags && tags !== "All Topics") {
      filter.tags = { $regex: new RegExp(tags, "i") };
    }
    
    if (search) {
      filter.$or = [
        { title: { $regex: new RegExp(search, "i") } },
        { tags: { $regex: new RegExp(search, "i") } },
      ];
    }

    const problems = await Problem.find(filter).sort({ title: 1 });
    res.json(problems);
  } catch (e) {
    console.error("Error fetching problems:", e);
    res.status(500).json({ error: e.message });
  }
});

router.get("/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const problem = await Problem.findOne({ slug });
    
    if (!problem) {
      return res.status(404).json({ error: "Problem not found" });
    }
    
    res.json(problem);
  } catch (e) {
    console.error("Error fetching problem:", e);
    res.status(500).json({ error: e.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const problem = await Problem.create(req.body);
    res.status(201).json(problem);
  } catch (e) {
    console.error("Error creating problem:", e);
    res.status(400).json({ error: e.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const problem = await Problem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!problem) {
      return res.status(404).json({ error: "Problem not found" });
    }
    res.json(problem);
  } catch (e) {
    console.error("Error updating problem:", e);
    res.status(400).json({ error: e.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const problem = await Problem.findByIdAndDelete(req.params.id);
    if (!problem) {
      return res.status(404).json({ error: "Problem not found" });
    }
    res.json({ message: "Problem deleted" });
  } catch (e) {
    console.error("Error deleting problem:", e);
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
