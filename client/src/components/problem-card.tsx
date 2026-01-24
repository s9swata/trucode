import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Problem } from "@/lib/mock-data";

type ProblemCardProps = {
  problem: Problem;
  href?: string;
};

const difficultyStyles: Record<Problem["difficulty"], string> = {
  Easy: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  Hard: "bg-rose-50 text-rose-700 border-rose-200",
};

export default function ProblemCard({ problem, href }: ProblemCardProps) {
  const targetHref = href ?? `/problems/${problem.slug}`;

  return (
    <Card className="transition-all hover:-translate-y-0.5 hover:shadow-md">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <Link
              className="text-lg font-semibold text-foreground hover:underline"
              href={targetHref}
            >
              {problem.title}
            </Link>
            <p className="text-sm text-muted-foreground">
              Acceptance {problem.acceptanceRate.toFixed(1)}% ·{" "}
              {problem.submissions.toLocaleString()} submissions
            </p>
          </div>
          <Badge
            variant="outline"
            className={`rounded-full border px-3 py-1 text-xs ${difficultyStyles[problem.difficulty]}`}
          >
            {problem.difficulty}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="line-clamp-3 text-sm text-muted-foreground">
          {problem.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {problem.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="rounded-full">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
