import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { submissions } from "@/lib/mock-data";

const statusStyles: Record<string, string> = {
  Accepted: "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Wrong Answer": "bg-amber-50 text-amber-700 border-amber-200",
  "Time Limit": "bg-rose-50 text-rose-700 border-rose-200",
};

export default function SubmissionsPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Submission history
            </p>
            <h1 className="text-3xl font-semibold">Recent submissions</h1>
            <p className="text-sm text-muted-foreground">
              Track your attempts across all problems and languages.
            </p>
          </div>
          <Badge variant="secondary" className="rounded-full">
            {submissions.length} total
          </Badge>
        </div>
        <Card>
          <CardContent className="grid gap-4 p-4 md:grid-cols-[1.4fr_0.8fr_0.8fr] md:items-center">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground">
                Search
              </p>
              <Input placeholder="Search by problem or language" />
            </div>
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground">
                Status
              </p>
              <div className="flex flex-wrap gap-2">
                {["All", "Accepted", "Wrong Answer", "Time Limit"].map(
                  (status) => (
                    <Badge
                      key={status}
                      variant={status === "All" ? "default" : "secondary"}
                      className="rounded-full"
                    >
                      {status}
                    </Badge>
                  )
                )}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground">
                Language
              </p>
              <div className="flex flex-wrap gap-2">
                {["TypeScript", "Python", "Go", "Rust"].map((language) => (
                  <Badge
                    key={language}
                    variant="outline"
                    className="rounded-full"
                  >
                    {language}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader className="space-y-2">
          <h2 className="text-lg font-semibold">Submission details</h2>
          <p className="text-sm text-muted-foreground">
            Review runtime, memory usage, and status outcomes.
          </p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Problem</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Language</TableHead>
                <TableHead>Runtime</TableHead>
                <TableHead>Memory</TableHead>
                <TableHead>Submitted</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell className="font-medium">
                    {submission.problemTitle}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`rounded-full border px-3 py-1 text-xs ${
                        statusStyles[submission.status] ?? ""
                      }`}
                    >
                      {submission.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{submission.language}</TableCell>
                  <TableCell>{submission.runtimeMs} ms</TableCell>
                  <TableCell>{submission.memoryMb} MB</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {submission.submittedAt}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
