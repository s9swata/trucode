"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

type LanguageOption = {
  id: string;
  label: string;
  starter: string;
};

const defaultLanguages: LanguageOption[] = [
  {
    id: "typescript",
    label: "TypeScript",
    starter: `function twoSum(nums: number[], target: number): number[] {\n  const seen = new Map<number, number>();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (seen.has(complement)) {\n      return [seen.get(complement)!, i];\n    }\n    seen.set(nums[i], i);\n  }\n  return [];\n}\n`,
  },
  {
    id: "python",
    label: "Python",
    starter: `def two_sum(nums, target):\n    seen = {}\n    for i, n in enumerate(nums):\n        complement = target - n\n        if complement in seen:\n            return [seen[complement], i]\n        seen[n] = i\n    return []\n`,
  },
  {
    id: "go",
    label: "Go",
    starter: `func twoSum(nums []int, target int) []int {\n    seen := map[int]int{}\n    for i, n := range nums {\n        if j, ok := seen[target-n]; ok {\n            return []int{j, i}\n        }\n        seen[n] = i\n    }\n    return []int{}\n}\n`,
  },
];

type CodeEditorProps = {
  title?: string;
  onRun?: (language: string, code: string) => void;
  onSubmit?: (language: string, code: string) => void;
  languages?: LanguageOption[];
};

export default function CodeEditor({
  title = "Submit solution",
  onRun,
  onSubmit,
  languages = defaultLanguages,
}: CodeEditorProps) {
  const [activeLanguage, setActiveLanguage] = useState(languages[0]?.id ?? "");
  const initialCode = useMemo(() => {
    const found = languages.find((lang) => lang.id === activeLanguage);
    return found?.starter ?? "";
  }, [activeLanguage, languages]);

  const [code, setCode] = useState(initialCode);

  const handleLanguageChange = (value: string) => {
    setActiveLanguage(value);
    const next = languages.find((lang) => lang.id === value);
    setCode(next?.starter ?? "");
  };

  return (
    <Card>
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-sm text-muted-foreground">
              Write your solution and submit for evaluation.
            </p>
          </div>
          <Badge variant="secondary" className="rounded-full">
            Draft
          </Badge>
        </div>
        <Tabs value={activeLanguage} onValueChange={handleLanguageChange}>
          <TabsList>
            {languages.map((language) => (
              <TabsTrigger key={language.id} value={language.id}>
                {language.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {languages.map((language) => (
            <TabsContent key={language.id} value={language.id} />
          ))}
        </Tabs>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={code}
          onChange={(event) => setCode(event.target.value)}
          className="min-h-[260px] font-mono text-sm leading-6"
          placeholder="Write your solution here..."
        />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            Tip: Keep time complexity under control for large inputs.
          </p>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={() => onRun?.(activeLanguage, code)}
            >
              Run sample
            </Button>
            <Button onClick={() => onSubmit?.(activeLanguage, code)}>
              Submit
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
