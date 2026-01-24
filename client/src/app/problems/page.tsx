"use client";

import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import ProblemCard from "@/components/problem-card";
import { problems, type Difficulty } from "@/lib/mock-data";

const difficultyFilters = ["All", "Easy", "Medium", "Hard"] as const;
const topicFilters = [
  "All Topics",
  "Array",
  "Hash Map",
  "String",
  "Sliding Window",
  "Binary Search",
  "Divide and Conquer",
  "Dynamic Programming",
  "Two Pointers",
  "Greedy",
  "Sorting",
  "Stack",
  "Tree",
  "Graph",
  "Backtracking",
  "Linked List",
];

export default function ProblemsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    "All" | Difficulty
  >("All");
  const [selectedTopic, setSelectedTopic] = useState("All Topics");

  const filteredProblems = useMemo(() => {
    return problems.filter((problem) => {
      const matchesSearch =
        problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        problem.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      const matchesDifficulty =
        selectedDifficulty === "All" ||
        problem.difficulty === selectedDifficulty;

      const matchesTopic =
        selectedTopic === "All Topics" ||
        problem.tags.some(
          (tag) => tag.toLowerCase() === selectedTopic.toLowerCase(),
        );

      return matchesSearch && matchesDifficulty && matchesTopic;
    });
  }, [searchQuery, selectedDifficulty, selectedTopic]);

  return (
    <div className="flex h-[calc(100vh-6rem)] flex-col gap-6">
      <section className="shrink-0 space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Problem library
            </p>
            <h1 className="text-3xl font-semibold">Browse problems</h1>
            <p className="text-sm text-muted-foreground">
              Filter by difficulty, explore tags, and start solving with a
              focused workflow.
            </p>
          </div>
          <Badge variant="secondary" className="rounded-full">
            {filteredProblems.length} problems found
          </Badge>
        </div>
        <Card>
          <CardContent className="grid gap-4 p-4 md:grid-cols-[1.2fr_1fr_1fr] md:items-start">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground">
                Search
              </p>
              <Input
                placeholder="Search by title, tag, or keyword"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground">
                Difficulty
              </p>
              <div className="flex flex-wrap gap-2">
                {difficultyFilters.map((filter) => (
                  <Badge
                    key={filter}
                    variant={
                      selectedDifficulty === filter ? "default" : "secondary"
                    }
                    className="cursor-pointer rounded-full hover:bg-primary/90"
                    onClick={() => setSelectedDifficulty(filter)}
                  >
                    {filter}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground">
                Topic focus
              </p>
              <div className="flex max-h-24 flex-wrap gap-2 overflow-y-auto">
                {topicFilters.map((topic) => (
                  <Badge
                    key={topic}
                    variant={selectedTopic === topic ? "default" : "outline"}
                    className="cursor-pointer rounded-full hover:bg-primary/90 hover:text-primary-foreground"
                    onClick={() => setSelectedTopic(topic)}
                  >
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <Separator className="shrink-0" />

      <section className="grid min-h-0 grow gap-6 lg:grid-cols-[1.65fr_0.75fr]">
        <div className="flex flex-col gap-5 overflow-y-auto pr-2 pb-10">
          {filteredProblems.length > 0 ? (
            filteredProblems.map((problem) => (
              <ProblemCard key={problem.id} problem={problem} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
              <p className="text-lg font-semibold">No problems found</p>
              <p className="text-sm">
                Try adjusting your filters or search query.
              </p>
            </div>
          )}
        </div>
        <aside className="hidden space-y-6 overflow-y-auto pr-2 pb-10 lg:block">
          <Card>
            <CardContent className="space-y-4 p-6">
              <div>
                <p className="text-xs font-semibold text-muted-foreground">
                  Daily challenge
                </p>
                <h2 className="text-lg font-semibold">Two Sum</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Solve today&apos;s featured problem and earn streak points.
                </p>
              </div>
              <div className="rounded-2xl border bg-background p-4 text-sm text-muted-foreground">
                <p>Acceptance rate: 48.7%</p>
                <p>Average runtime: 78 ms</p>
              </div>
              <Badge className="cursor-pointer rounded-full">
                Start challenge
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-4 p-6">
              <div>
                <p className="text-xs font-semibold text-muted-foreground">
                  Your progress
                </p>
                <h2 className="text-lg font-semibold">Skill coverage</h2>
              </div>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span>Arrays</span>
                  <span className="font-medium text-foreground">68%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Strings</span>
                  <span className="font-medium text-foreground">52%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Binary Search</span>
                  <span className="font-medium text-foreground">40%</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Complete more medium problems to unlock advanced tracks.
              </p>
            </CardContent>
          </Card>
        </aside>
      </section>
    </div>
  );
}
