const express = require("express");
const Submissions = require("../models/Submissions");
const { submitCode, getSubmissionResult } = require("../utils");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allSubmissions = await Submissions.find({});
    return res.send(allSubmissions);
  } catch (e) {
    return res.status(400).json({ error: e });
  }
});

router.post("/", async (req, res) => {
  console.log("=== SUBMISSION REQUEST ===");
  console.log("Body:", JSON.stringify(req.body, null, 2));
  
  const {
    username,
    source_code,
    problem_id,
    language_id,
    stdin,
    callback_url,
  } = req.body;
  
  console.log("username:", username);
  console.log("problem_id:", problem_id);
  console.log("language_id:", language_id);
  console.log("source_code length:", source_code?.length);
  console.log("source_code:", source_code?.substring(0, 100));
  
  try {
    if (
      !username ||
      !source_code ||
      !problem_id ||
      !language_id
    ) {
      console.log("Missing required fields");
      res.status(400).json({ msg: "Missing required fields" });
      return;
    }
    const submission = await Submissions.create({
      username,
      source_code,
      problem_id,
      language_id,
      test_cases_passed: 0,
      status: "pending",
    });
    console.log("Created submission in DB:", submission._id);

    try {
      console.log("Submitting to Judge0...");
      console.log("  language_id:", language_id);
      console.log("  source_code:", source_code.substring(0, 50) + "...");
      console.log("  stdin:", stdin);
      
      const response = await submitCode(
        language_id,
        source_code,
        stdin || "",
        callback_url || "",
      );
      
      console.log("Judge0 response:", JSON.stringify(response, null, 2));
      
      if (response) {
        const statusId = response.status_id;
        const status = statusId === 3 ? "accepted" : "failed";
        const token = response.token || `result_${submission._id}`;
        
        console.log("Status ID:", statusId);
        console.log("Final status:", status);
        
        await Submissions.updateOne(
          { _id: submission._id },
          { $set: { token, status } },
        );
        
        console.log("Sending response to client");
        res.status(200).json({ 
          msg: "Submission created",
          token: token,
          submissionId: submission._id.toString(),
          status,
          stdout: response.stdout || "",
          stderr: response.stderr || "",
          compile_output: response.compile_output || "",
        });
      } else {
        console.log("No response from Judge0");
        await Submissions.updateOne(
          { _id: submission._id },
          { $set: { status: "failed" } },
        );
        res.status(500).json({ 
          msg: "Failed to execute code",
          error: "No response from execution engine"
        });
      }
    } catch (judgeError) {
      console.log("Judge0 error:", judgeError.message);
      console.log("Judge0 error stack:", judgeError.stack);
      await Submissions.updateOne(
        { _id: submission._id },
        { $set: { status: "failed" } },
      );
      res.status(500).json({ 
        msg: "Failed to submit code",
        error: judgeError.message 
      });
    }
  } catch (e) {
    console.log("Error creating submission", e);
    res.status(400).json({ msg: "Error while submitting request" });
  }
});

router.get("/result/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const submission = await Submissions.findOne({ token });
    
    if (!submission) {
      return res.status(404).json({ msg: "Submission not found" });
    }

    const judgeResult = await getSubmissionResult(token);
    
    let status = "pending";
    let test_cases_passed = 0;
    
    if (judgeResult.status && judgeResult.status.id !== 1 && judgeResult.status.id !== 2) {
      status = judgeResult.status.id === 3 ? "accepted" : "failed";
      test_cases_passed = judgeResult.testcase_count || 0;
      
      await Submissions.updateOne(
        { _id: submission._id },
        { $set: { status, test_cases_passed } },
      );
    }

    res.json({
      status,
      test_cases_passed,
      total_test_cases: judgeResult.testcase_count || 0,
      stdout: judgeResult.stdout,
      stderr: judgeResult.stderr,
      compile_output: judgeResult.compile_output,
      time: judgeResult.time,
      memory: judgeResult.memory,
    });
  } catch (e) {
    console.log("Error getting result", e);
    res.status(400).json({ msg: "Error getting result" });
  }
});

router.get("/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const submissions = await Submissions.find({ username: username });
    return res.send(submissions);
  } catch (e) {
    return res.status(400).json({ error: e });
  }
});

module.exports = router;
