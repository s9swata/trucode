import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import CodeEditor from "@/components/code-editor";
import { discussions, problems, submissions } from "@/lib/mock-data";

type ProblemDetailPageProps = {
  params: Promise<{ slug: string }>;
};

const difficultyStyles: Record<"Easy" | "Medium" | "Hard", string> = {
  Easy: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  Hard: "bg-rose-50 text-rose-700 border-rose-200",
};

export default async function ProblemDetailPage({
  params,
}: ProblemDetailPageProps) {
  const { slug } = await params;
  const problem = problems.find((item) => item.slug === slug);

  if (!problem) {
    notFound();
  }

  const relatedDiscussions = discussions.filter(
    (item) => item.problemId === problem.id,
  );
  const recentSubmissions = submissions.filter(
    (item) => item.problemId === problem.id,
  );

  const similarProblems = problems
    .filter(
      (p) =>
        p.id !== problem.id && p.tags.some((tag) => problem.tags.includes(tag)),
    )
    .slice(0, 3);

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

          <CodeEditor title="Submit solution" />
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

          {similarProblems.length > 0 && (
            <Card>
              <CardHeader className="space-y-2">
                <h2 className="text-lg font-semibold">Similar problems</h2>
                <p className="text-sm text-muted-foreground">
                  Explore problems with similar concepts.
                </p>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                {similarProblems.map((p) => (
                  <div
                    key={p.id}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border bg-background px-4 py-3"
                  >
                    <Link
                      href={`/problems/${p.slug}`}
                      className="font-medium text-foreground hover:underline"
                    >
                      {p.title}
                    </Link>
                    <Badge
                      variant="outline"
                      className={`rounded-full border px-2 py-0.5 text-[10px] ${difficultyStyles[p.difficulty]}`}
                    >
                      {p.difficulty}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
