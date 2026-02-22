import Link from "next/link";

const stats = [
  { label: "Problems", value: "1,200+" },
  { label: "Weekly submissions", value: "85k" },
  { label: "Active discuss threads", value: "4.3k" },
  { label: "Languages supported", value: "8" },
];

const features = [
  {
    title: "Curated problem sets",
    description:
      "Progress from warm-up challenges to competition-grade questions with structured tracks.",
  },
  {
    title: "Interactive submissions",
    description:
      "Run against sample inputs, then submit for full evaluation and feedback.",
  },
  {
    title: "Collaborative discussions",
    description:
      "Share insights, ask questions, and review alternative approaches to every problem.",
  },
  {
    title: "Performance analytics",
    description:
      "Track runtime, memory, and acceptance rate trends to sharpen your solutions.",
  },
];

const highlights = [
  {
    title: "Company-ready practice",
    detail: "Daily challenges and interview-style problem sets to stay sharp.",
  },
  {
    title: "Community editorial notes",
    detail:
      "Learn the intuition behind optimal solutions with peer-reviewed posts.",
  },
  {
    title: "Personalized growth",
    detail:
      "Identify gaps with skill tags, difficulty ramps, and progress metrics.",
  },
];

const workflow = [
  {
    step: "01",
    title: "Pick a problem",
    detail: "Filter by topic, difficulty, or track.",
  },
  {
    step: "02",
    title: "Draft your solution",
    detail: "Use the in-browser editor with starter templates.",
  },
  {
    step: "03",
    title: "Run and submit",
    detail: "Validate with samples, then submit for evaluation.",
  },
  {
    step: "04",
    title: "Discuss and iterate",
    detail: "Share insights and refine based on feedback.",
  },
];

const sampleProblems = [
  {
    title: "Two Sum",
    difficulty: "Easy",
    tag: "Hash Map",
  },
  {
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    tag: "Sliding Window",
  },
  {
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    tag: "Binary Search",
  },
];

export default function Home() {
  return (
    <div className="space-y-16 pb-16">
      <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-xs font-medium text-muted-foreground">
            New: Tangerine theme applied
          </span>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Practice, submit, and discuss coding problems in one focused
            workspace.
          </h1>
          <p className="text-lg text-muted-foreground">
            TruCode is a modern code evaluation platform inspired by LeetCode.
            Work through curated problem sets, submit solutions, and learn from
            community discussion — all in a clean, performance-first interface.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/problems"
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Start solving
            </Link>
            <Link
              href="/discuss"
              className="rounded-full border px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
            >
              Explore discussions
            </Link>
          </div>
          <div className="grid gap-4 pt-6 sm:grid-cols-2">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border bg-card p-4 shadow-sm"
              >
                <p className="text-2xl font-semibold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-5 rounded-3xl border bg-card p-6 shadow-sm">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Featured problem
            </p>
            <h2 className="text-2xl font-semibold">Two Sum</h2>
            <p className="text-sm text-muted-foreground">
              Given an array of integers, return indices of the two numbers that
              add up to a target.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border px-3 py-1 text-xs">
                Easy
              </span>
              <span className="rounded-full border px-3 py-1 text-xs">
                Array
              </span>
              <span className="rounded-full border px-3 py-1 text-xs">
                Hash Map
              </span>
            </div>
          </div>
          <div className="rounded-2xl border bg-background p-4 font-mono text-xs text-muted-foreground">
            <p>{/* Example */}</p>
            <p>nums = [2,7,11,15]</p>
            <p>target = 9</p>
            <p>output = [0,1]</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/problems/two-sum"
              className="rounded-full bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Solve now
            </Link>
            <Link
              href="/submissions"
              className="rounded-full border px-5 py-2 text-xs font-semibold text-foreground transition hover:bg-muted"
            >
              View submissions
            </Link>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Core features
            </p>
            <h2 className="text-3xl font-semibold">
              Everything you need to prepare.
            </h2>
          </div>
          <Link
            href="/problems"
            className="text-sm font-semibold text-primary hover:underline"
          >
            Browse all problems
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl border bg-card p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border bg-card p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Platform highlights</h3>
          <div className="mt-5 space-y-4">
            {highlights.map((highlight) => (
              <div key={highlight.title} className="space-y-1">
                <p className="text-sm font-semibold">{highlight.title}</p>
                <p className="text-sm text-muted-foreground">
                  {highlight.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border bg-card p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Popular problems</h3>
          <div className="mt-4 space-y-3">
            {sampleProblems.map((problem) => (
              <div
                key={problem.title}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border bg-background px-4 py-3"
              >
                <div>
                  <p className="text-sm font-semibold">{problem.title}</p>
                  <p className="text-xs text-muted-foreground">{problem.tag}</p>
                </div>
                <span className="rounded-full border px-3 py-1 text-xs">
                  {problem.difficulty}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-3xl border bg-card p-8 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Your path to mastery
            </p>
            <h2 className="text-3xl font-semibold">
              A structured workflow for every problem.
            </h2>
          </div>
          <Link
            href="/problems"
            className="rounded-full border px-6 py-2 text-sm font-semibold text-foreground transition hover:bg-muted"
          >
            Explore tracks
          </Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {workflow.map((item) => (
            <div
              key={item.step}
              className="rounded-2xl border bg-background p-5"
            >
              <p className="text-xs font-semibold text-muted-foreground">
                {item.step}
              </p>
              <p className="mt-2 text-lg font-semibold">{item.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border bg-primary/10 p-8 text-center">
        <h2 className="text-3xl font-semibold">
          Ready to start your next session?
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Jump into the problem list, submit solutions, and collaborate with the
          community.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/problems"
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Go to problems
          </Link>
          <Link
            href="/discuss"
            className="rounded-full border px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
          >
            Join the forum
          </Link>
        </div>
      </section>
    </div>
  );
}
