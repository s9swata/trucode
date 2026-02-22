"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import CodeEditor from "@/components/code-editor";
import { fetchProblem, submitSolution, getSubmissionResult, type Problem, type SubmissionResult } from "@/lib/api";
import { discussions, submissions as mockSubmissions } from "@/lib/mock-data";

const difficultyStyles: Record<"Easy" | "Medium" | "Hard", string> = {
  Easy: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  Hard: "bg-rose-50 text-rose-700 border-rose-200",
};

export default function ProblemDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [problem, setProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (language: string, code: string) => {
    if (!problem) return;
    
    setSubmitting(true);
    setSubmissionResult(null);
    setSubmitError(null);
    
    try {
      const result = await submitSolution(
        problem._id,
        code,
        language,
        "anonymous-user"
      );
      
      if ('error' in result) {
        setSubmitError(result.error);
        setSubmitting(false);
        return;
      }
      
      setSubmissionResult({
        status: result.status as "accepted" | "failed" | "pending",
        test_cases_passed: result.status === "accepted" ? 1 : 0,
        total_test_cases: 1,
        stdout: result.stdout,
        stderr: result.stderr,
      });
      setSubmitting(false);
    } catch (err) {
      console.error("Submission failed:", err);
      setSubmitError(err instanceof Error ? err.message : "Submission failed");
      setSubmitting(false);
    }
  }, [problem]);

  const handleRun = useCallback(async (language: string, code: string) => {
    console.log("Running code:", language);
    console.log("Code:", code);
  }, []);

  useEffect(() => {
    if (!slug) return;
    
    async function loadProblem() {
      try {
        const data = await fetchProblem(slug);
        setProblem(data);
      } catch (err) {
        console.error("Failed to fetch problem:", err);
        setError("Problem not found");
      } finally {
        setLoading(false);
      }
    }
    loadProblem();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted-foreground">Loading problem...</p>
      </div>
    );
  }

  if (error || !problem) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-red-500">{error || "Problem not found"}</p>
      </div>
    );
  }

  const relatedDiscussions = discussions.filter(
    (item) => item.problemId === problem._id,
  );
  const recentSubmissions = mockSubmissions.filter(
    (item) => item.problemId === problem._id,
  );

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Problem statement
            </p>
            <h1 className="text-3xl font-semibold">{problem.title}</h1>
            <p className="text-sm text-muted-foreground">
              {problem.submissions.toLocaleString()} submissions ·{" "}
              {problem.acceptanceRate.toFixed(1)}% acceptance
            </p>
          </div>
          <Badge
            variant="outline"
            className={`rounded-full border px-3 py-1 text-xs ${difficultyStyles[problem.difficulty]}`}
          >
            {problem.difficulty}
          </Badge>
        </div>
        <div className="flex flex-wrap gap-2">
          {problem.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="rounded-full">
              {tag}
            </Badge>
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Problem description</h2>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              {problem.description.split("\n").map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <Separator />
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground">
                  Examples
                </h3>
                {problem.examples.map((example) => (
                  <div
                    key={example.input}
                    className="rounded-2xl border bg-background p-4"
                  >
                    <p className="font-medium text-foreground">Input</p>
                    <p className="text-sm text-muted-foreground">
                      {example.input}
                    </p>
                    <p className="mt-3 font-medium text-foreground">Output</p>
                    <p className="text-sm text-muted-foreground">
                      {example.output}
                    </p>
                    {example.explanation ? (
                      <>
                        <p className="mt-3 font-medium text-foreground">
                          Explanation
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {example.explanation}
                        </p>
                      </>
                    ) : null}
                  </div>
                ))}
              </div>
              <Separator />
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground">
                  Constraints
                </h3>
                <ul className="list-disc space-y-2 pl-5">
                  {problem.constraints.map((constraint) => (
                    <li key={constraint}>{constraint}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <CodeEditor 
            title="Submit solution" 
            onRun={handleRun}
            onSubmit={handleSubmit}
          />
          
          {submissionResult && (
            <Card className={submissionResult.status === "accepted" ? "border-green-500" : "border-red-500"}>
              <CardHeader>
                <h2 className="text-lg font-semibold">
                  {submissionResult.status === "accepted" 
                    ? "Accepted!" 
                    : submissionResult.status === "failed" 
                      ? "Wrong Answer" 
                      : "Pending..."}
                </h2>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>Test cases passed: {submissionResult.test_cases_passed} / {submissionResult.total_test_cases}</p>
                {submissionResult.stdout && (
                  <div className="mt-2 rounded bg-muted p-2">
                    <p className="font-medium">Output:</p>
                    <pre className="whitespace-pre-wrap">{submissionResult.stdout}</pre>
                  </div>
                )}
                {submissionResult.stderr && (
                  <div className="mt-2 rounded bg-red-50 p-2 text-red-600">
                    <p className="font-medium">Error:</p>
                    <pre className="whitespace-pre-wrap">{submissionResult.stderr}</pre>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
          
          {submitting && (
            <Card>
              <CardContent className="flex items-center gap-3 py-4">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"></div>
                <p className="text-sm">Running your solution...</p>
              </CardContent>
            </Card>
          )}
          
          {submitError && (
            <Card className="border-red-500">
              <CardContent className="py-4">
                <p className="text-sm text-red-600">{submitError}</p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="space-y-2">
              <h2 className="text-lg font-semibold">Quick stats</h2>
              <p className="text-sm text-muted-foreground">
                Track performance targets and difficulty insights.
              </p>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>Difficulty</span>
                <span className="font-medium text-foreground">
                  {problem.difficulty}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Acceptance rate</span>
                <span className="font-medium text-foreground">
                  {problem.acceptanceRate.toFixed(1)}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Submissions</span>
                <span className="font-medium text-foreground">
                  {problem.submissions.toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="space-y-2">
              <h2 className="text-lg font-semibold">Recent submissions</h2>
              <p className="text-sm text-muted-foreground">
                Snapshot of recent attempts on this problem.
              </p>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              {recentSubmissions.length === 0 ? (
                <p>No submissions yet.</p>
              ) : (
                recentSubmissions.map((submission) => (
                  <div
                    key={submission.id}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border bg-background px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {submission.language}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {submission.runtimeMs} ms · {submission.memoryMb} MB
                      </p>
                    </div>
                    <Badge
                      variant={
                        submission.status === "Accepted"
                          ? "default"
                          : "secondary"
                      }
                      className="rounded-full"
                    >
                      {submission.status}
                    </Badge>
                  </div>
                ))
              )}
              <Link
                href="/submissions"
                className="text-xs font-semibold text-primary hover:underline"
              >
                View all submissions
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="space-y-2">
              <h2 className="text-lg font-semibold">Discuss this problem</h2>
              <p className="text-sm text-muted-foreground">
                Ask questions or share your approach with the community.
              </p>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              {relatedDiscussions.map((discussion) => (
                <div
                  key={discussion.id}
                  className="rounded-2xl border bg-background p-4"
                >
                  <p className="text-sm font-semibold text-foreground">
                    {discussion.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {discussion.replies} replies · {discussion.likes} likes
                  </p>
                </div>
              ))}
              <Link
                href={`/problems/${problem.slug}/discussion`}
                className="text-xs font-semibold text-primary hover:underline"
              >
                Open discussion forum
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
