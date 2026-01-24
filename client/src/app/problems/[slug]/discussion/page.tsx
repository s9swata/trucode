import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { discussions, problems } from "@/lib/mock-data";

type DiscussionPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function DiscussionPage({ params }: DiscussionPageProps) {
  const { slug } = await params;
  const problem = problems.find((item) => item.slug === slug);

  if (!problem) {
    notFound();
  }

  const problemThreads = discussions.filter(
    (thread) => thread.problemId === problem.id,
  );

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Discussion forum
            </p>
            <h1 className="text-3xl font-semibold">
              {problem.title} discussions
            </h1>
            <p className="text-sm text-muted-foreground">
              Share insights, ask questions, and learn from community
              approaches.
            </p>
          </div>
          <Link
            href={`/problems/${problem.slug}`}
            className="text-sm font-semibold text-primary hover:underline"
          >
            Back to problem
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {problem.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="rounded-full">
              {tag}
            </Badge>
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-6">
          <Card>
            <CardHeader className="space-y-2">
              <h2 className="text-lg font-semibold">Start a new thread</h2>
              <p className="text-sm text-muted-foreground">
                Ask a question or share an insight about this problem.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Thread title" />
              <Textarea
                className="min-h-[160px]"
                placeholder="Write your message..."
              />
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-muted-foreground">
                  Be clear and include inputs or constraints when needed.
                </p>
                <Button>Create thread</Button>
              </div>
            </CardContent>
          </Card>

          <Separator />

          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-semibold">Community threads</h2>
              <Badge variant="secondary" className="rounded-full">
                {problemThreads.length} threads
              </Badge>
            </div>
            {problemThreads.map((thread) => (
              <Card key={thread.id}>
                <CardContent className="space-y-3 p-5">
                  <div className="space-y-1">
                    <p className="text-base font-semibold text-foreground">
                      {thread.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Started by {thread.author} · {thread.createdAt}
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
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="rounded-full"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <aside className="space-y-6">
          <Card>
            <CardHeader className="space-y-2">
              <h2 className="text-lg font-semibold">Discussion guidelines</h2>
              <p className="text-sm text-muted-foreground">
                Keep threads helpful and focused on the problem.
              </p>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>• Share your approach before asking for full solutions.</p>
              <p>• Use tags to categorize your post.</p>
              <p>• Be respectful and upvote useful replies.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="space-y-2">
              <h2 className="text-lg font-semibold">Related resources</h2>
              <p className="text-sm text-muted-foreground">
                Quick links to keep you moving.
              </p>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <Link
                href={`/problems/${problem.slug}`}
                className="block font-semibold text-primary hover:underline"
              >
                View problem statement
              </Link>
              <Link
                href="/submissions"
                className="block font-semibold text-primary hover:underline"
              >
                Review recent submissions
              </Link>
              <Link
                href="/problems"
                className="block font-semibold text-primary hover:underline"
              >
                Browse all problems
              </Link>
            </CardContent>
          </Card>
        </aside>
      </section>
    </div>
  );
}
