const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export type Difficulty = "Easy" | "Medium" | "Hard";

export type Problem = {
  _id: string;
  title: string;
  slug: string;
  difficulty: Difficulty;
  tags: string[];
  acceptanceRate: number;
  submissions: number;
  description: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
  testCases: {
    input: string;
    expectedOutput: string;
  }[];
  createdAt: string;
  updatedAt: string;
};

export type ProblemFilters = {
  difficulty?: string;
  tags?: string;
  search?: string;
};

export async function fetchProblems(filters?: ProblemFilters): Promise<Problem[]> {
  const params = new URLSearchParams();
  
  if (filters?.difficulty && filters.difficulty !== "All") {
    params.append("difficulty", filters.difficulty);
  }
  if (filters?.tags && filters.tags !== "All Topics") {
    params.append("tags", filters.tags);
  }
  if (filters?.search) {
    params.append("search", filters.search);
  }

  const queryString = params.toString();
  const url = `${API_URL}/problems${queryString ? `?${queryString}` : ""}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch problems: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

export async function fetchProblem(slug: string): Promise<Problem> {
  const response = await fetch(`${API_URL}/problems/${slug}`);
  if (!response.ok) {
    throw new Error("Problem not found");
  }
  return response.json();
}

export type Submission = {
  _id: string;
  username: string;
  source_code: string;
  problem_id: string;
  language_id: number;
  test_cases_passed: number;
  status: "pending" | "accepted" | "failed";
  token: string | null;
  createdAt: string;
  updatedAt: string;
};

export type SubmissionResult = {
  status: "pending" | "accepted" | "failed";
  test_cases_passed: number;
  total_test_cases: number;
  stdout?: string;
  stderr?: string;
  compile_output?: string;
  time?: string;
  memory?: number;
};

export const languageToId: Record<string, number> = {
  typescript: 74,
  python: 71,
  go: 60,
  javascript: 63,
  java: 62,
  cpp: 54,
  c: 50,
  rust: 73,
  ruby: 72,
};

export async function submitSolution(
  problemId: string,
  sourceCode: string,
  language: string,
  userId: string
): Promise<{ token: string; submissionId: string; status: string; stdout: string; stderr: string } | { error: string }> {
  const languageId = languageToId[language];
  if (!languageId) {
    throw new Error(`Unsupported language: ${language}`);
  }

  const response = await fetch(`${API_URL}/submissions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: userId,
      source_code: sourceCode,
      problem_id: problemId,
      language_id: languageId,
      stdin: "",
      callback_url: "",
    }),
  });
  
  const data = await response.json();
  
  if (!response.ok || !data.token) {
    throw new Error(data.error || `Failed to submit: ${response.status}`);
  }
  
  return { 
    token: data.token, 
    submissionId: data.submissionId,
    status: data.status,
    stdout: data.stdout,
    stderr: data.stderr,
  };
}

export async function getSubmissionResult(token: string): Promise<SubmissionResult> {
  const response = await fetch(`${API_URL}/submissions/result/${token}`);
  if (!response.ok) {
    throw new Error(`Failed to get result: ${response.status}`);
  }
  return response.json();
}
