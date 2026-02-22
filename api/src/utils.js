const mongoose = require("mongoose");
const axios = require("axios");

const JUDGE0_API = "https://ce.judge0.com";

async function connectToDb(connectionString) {
  try {
    await mongoose.connect(connectionString, {
      autoIndex: true,
    });
    console.log("connected to db");
  } catch (err) {
    console.log(err);
  }
}

async function submitCode(language_id, source_code, stdin, callback_url) {
  console.log("=== submitCode called ===");
  console.log("language_id:", language_id);
  console.log("source_code:", source_code?.substring(0, 100));
  console.log("stdin:", stdin);
  
  const options = {
    method: "POST",
    url: `${JUDGE0_API}/submissions`,
    params: {
      base64_encoded: "false",
      wait: "true",
      fields: "*",
    },
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      language_id,
      source_code,
      stdin: stdin || "",
    },
  };

  console.log("Making request to Judge0:", JUDGE0_API);
  
  try {
    const response = await axios.request(options);
    console.log("Judge0 response status:", response.status);
    console.log("Judge0 response data:", JSON.stringify(response.data, null, 2));
    return {
      token: response.data.token,
      stdout: response.data.stdout,
      stderr: response.data.stderr,
      compile_output: response.data.compile_output,
      status: response.data.status,
      status_id: response.data.status?.id,
    };
  } catch (error) {
    console.error("Judge0 API error:", error.response?.data || error.message);
    console.error("Judge0 error stack:", error.stack);
    throw new Error("Failed to execute code");
  }
}

async function getSubmissionResult(token) {
  const options = {
    method: "GET",
    url: `${JUDGE0_API}/submissions/${token}`,
    params: {
      base64_encoded: "false",
      fields: "*",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error("Get result error:", error.response?.data || error.message);
    throw new Error("Failed to get result");
  }
}

module.exports = {
  connectToDb,
  submitCode,
  getSubmissionResult,
};
