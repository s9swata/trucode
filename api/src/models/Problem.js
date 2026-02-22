const mongoose = require("mongoose");

const ProblemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },
    tags: [{
      type: String,
    }],
    acceptanceRate: {
      type: Number,
      default: 0,
    },
    submissions: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      required: true,
    },
    examples: [{
      input: String,
      output: String,
      explanation: String,
    }],
    constraints: [{
      type: String,
    }],
    testCases: [{
      input: String,
      expectedOutput: String,
    }],
  },
  {
    timestamps: true,
  }
);

const Problem = mongoose.model("Problem", ProblemSchema);
module.exports = Problem;
