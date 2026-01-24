import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { discussions, problems } from "@/lib/mock-data";

const topicFilters = [
  "Editorial",
  "Tips",
  "Deep Dive",
  "Hash Map",
  "Sliding Window",
  "Binary Search",
];

export default function DiscussPage() {
  const totalReplies = discussions.reduce((sum, thread) => sum + thread.replies, 0);

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Community forum
            </p>
            <h1 className="text-3xl font-semibold">Discuss solutions</h1>
            <p className="text-sm text-muted-foreground">
              Join problem-specific threads, share insights, and ask questions.
            </p>
          </div>
          <Badge variant="secondary" className="rounded-full">
            {discussions.length} active threads
          </Badge>
        </div>
        <Card>
          <CardContent className="grid gap-4 p-4 md:grid-cols-[1.4fr_0.9fr_0.7fr] md:items-center">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground">Search</p>
              <Input placeholder="Search by title, tag, or problem" />
            </div>
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground">Topics</p>
              <div className="flex flex-wrap gap-2">
                {topicFilters.map((topic) => (
                  <Badge key={topic} variant="outline" className="rounded-full">
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground">Stats</p>
              <div className="rounded-2xl border bg-background p-3 text-sm text-muted-foreground">
                <p>{totalReplies} replies across all threads</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="space-y-6">
          <Card>
            <CardHeader className="space-y-2">
              <h2 className="text-lg font-semibold">Start a new discussion</h2>
              <p className="text-sm text-muted-foreground">
                Post a new idea, question, or editorial note.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Thread title" />
              <Input placeholder="Related problem (e.g., Two Sum)" />
              <Textarea
                className="min-h-[160px]"
                placeholder="Share your thoughts..."
              />
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-muted-foreground">
                  Add tags so others can discover your post.
                </p>
                <Button>Create thread</Button>
              </div>
            </CardContent>
          </Card>

          <Separator />

          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-semibold">Latest threads</h2>
              <Badge variant="secondary" className="rounded-full">
                {discussions.length} threads
              </Badge>
            </div>
            {discussions.map((thread) => {
              const relatedProblem = problems.find(
                (problem) => problem.id === thread.problemId
              );

              return (
                <Card key={thread.id}>
                  <CardContent className="space-y-3 p-5">
                    <div className="space-y-1">
                      <p className="text-base font-semibold text-foreground">
                        {thread.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {relatedProblem?.title ?? "General"} · Started by{" "}
                        {thread.author}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="outline" className="rounded-full">
                        {thread.replies} replies
                      </Badge>
                      <Badge variant="outline" className="rounded-full">
                        {thread.likes} likes
                      </Badge>
                      {thread.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="rounded-full">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    {relatedProblem ? (
                      <Link
                        href={`/problems/${relatedProblem.slug}/discussion`}
                        className="text-xs font-semibold text-primary hover:underline"
                      >
                        Join discussion
                      </Link>
                    ) : null}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <aside className="space-y-6">
          <Card>
            <CardHeader className="space-y-2">
              <h2 className="text-lg font-semibold">Popular topics</h2>
              <p className="text-sm text-muted-foreground">
                Stay engaged with recurring themes.
              </p>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>Editorials</span>
                <span className="font-medium text-foreground">48</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Optimization tips</span>
                <span className="font-medium text-foreground">27</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Data structures</span>
                <span className="font-medium text-foreground">19</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="space-y-2">
              <h2 className="text-lg font-semibold">Quick links</h2>
              <p className="text-sm text-muted-foreground">
                Jump back into practice.
              </p>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <Link
                href="/problems"
                className="block font-semibold text-primary hover:underline"
              >
                Browse problems
              </Link>
              <Link
                href="/submissions"
                className="block font-semibold text-primary hover:underline"
              >
                Review submissions
              </Link>
              <Link
                href="/"
                className="block font-semibold text-primary hover:underline"
              >
                Return to dashboard
              </Link>
            </CardContent>
          </Card>
        </aside>
      </section>
    </div>
  );
}
