import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AiDisclaimer } from "@/components/AiDisclaimer";
import { toast } from "sonner";
import { generateEmail } from "@/lib/ai.functions";
import { Mail, Copy, Download, RefreshCcw, Sparkles, Loader2, Wand2 } from "lucide-react";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — WorkSmart AI" },
      {
        name: "description",
        content:
          "Generate professional workplace emails in any tone — formal, friendly, persuasive, apology, or follow-up.",
      },
      { property: "og:title", content: "Smart Email Generator" },
      {
        property: "og:description",
        content: "AI-powered email drafts in seconds, in the tone you need.",
      },
    ],
  }),
  component: EmailPage,
});

const TONES = [
  { value: "professional", label: "Professional" },
  { value: "formal", label: "Formal" },
  { value: "friendly", label: "Friendly" },
  { value: "persuasive", label: "Persuasive" },
  { value: "apology", label: "Apology" },
  { value: "follow-up", label: "Follow-up" },
] as const;

type Tone = (typeof TONES)[number]["value"];

function EmailPage() {
  const callGenerate = useServerFn(generateEmail);
  const [tone, setTone] = useState<Tone>("professional");
  const [form, setForm] = useState({
    recipientName: "",
    recipientEmail: "",
    purpose: "",
    keyInfo: "",
    additional: "",
  });
  const [result, setResult] = useState<{ subject: string; body: string } | null>(null);

  const mutation = useMutation({
    mutationFn: async () =>
      (await callGenerate({ data: { ...form, tone } })) as { subject: string; body: string },
    onSuccess: (data) => {
      setResult(data);
      toast.success("Email drafted");
    },
    onError: (e: unknown) => {
      const msg = e instanceof Error ? e.message : "Failed to generate email";
      toast.error(msg);
    },
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.purpose.trim()) {
      toast.error("Please describe the purpose of the email");
      return;
    }
    mutation.mutate();
  };

  const copyEmail = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(`Subject: ${result.subject}\n\n${result.body}`);
    toast.success("Copied to clipboard");
  };

  const download = () => {
    if (!result) return;
    const blob = new Blob([`Subject: ${result.subject}\n\n${result.body}`], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${result.subject.replace(/[^\w\d-]+/g, "_").slice(0, 40) || "email"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-elegant">
            <Mail className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h1 className="truncate font-display text-2xl font-bold sm:text-3xl">Smart Email Generator</h1>
            <p className="text-sm text-muted-foreground">
              Tell WorkSmart what you need to say — get a polished draft in seconds.
            </p>
          </div>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        {/* Input */}
        <Card className="border-border/60 p-5 shadow-sm sm:p-6">
          <form onSubmit={submit} className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="rname">Recipient name</Label>
                <Input
                  id="rname"
                  placeholder="e.g. Sarah Chen"
                  value={form.recipientName}
                  onChange={(e) => setForm({ ...form, recipientName: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="remail">Recipient email</Label>
                <Input
                  id="remail"
                  type="email"
                  placeholder="sarah@company.com"
                  value={form.recipientEmail}
                  onChange={(e) => setForm({ ...form, recipientEmail: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="purpose">Purpose *</Label>
              <Input
                id="purpose"
                required
                placeholder="Follow up on last week's proposal"
                value={form.purpose}
                onChange={(e) => setForm({ ...form, purpose: e.target.value })}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="key">Key information to include</Label>
              <Textarea
                id="key"
                rows={4}
                placeholder="Deadline is Friday, mention the updated pricing, propose a 15-min call…"
                value={form.keyInfo}
                onChange={(e) => setForm({ ...form, keyInfo: e.target.value })}
              />
            </div>

            <div className="space-y-1.5">
              <Label>Tone</Label>
              <Tabs value={tone} onValueChange={(v) => setTone(v as Tone)}>
                <TabsList className="grid h-auto w-full grid-cols-3 gap-1 bg-muted/40 p-1">
                  {TONES.map((t) => (
                    <TabsTrigger key={t.value} value={t.value} className="text-xs">
                      {t.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="add">Additional instructions</Label>
              <Textarea
                id="add"
                rows={2}
                placeholder="Keep under 120 words, avoid jargon…"
                value={form.additional}
                onChange={(e) => setForm({ ...form, additional: e.target.value })}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-primary text-primary-foreground shadow-elegant hover:opacity-95"
              size="lg"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Drafting…
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4" /> Generate email
                </>
              )}
            </Button>
          </form>
        </Card>

        {/* Output */}
        <div className="space-y-4">
          <Card className="min-h-[420px] border-border/60 p-5 shadow-sm sm:p-6">
            {!result && !mutation.isPending && (
              <div className="flex h-full min-h-[380px] flex-col items-center justify-center text-center text-muted-foreground">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
                  <Sparkles className="h-6 w-6" />
                </div>
                <p className="mt-4 font-display text-base font-semibold text-foreground">
                  Your draft will appear here
                </p>
                <p className="mt-1 max-w-xs text-sm">
                  Fill the form and hit <span className="font-medium">Generate</span> — WorkSmart will write a
                  subject line and full body for you.
                </p>
              </div>
            )}

            {mutation.isPending && (
              <div className="space-y-3">
                <div className="h-5 w-1/2 animate-pulse rounded bg-muted" />
                <div className="h-3 w-full animate-pulse rounded bg-muted" />
                <div className="h-3 w-11/12 animate-pulse rounded bg-muted" />
                <div className="h-3 w-10/12 animate-pulse rounded bg-muted" />
                <div className="h-3 w-9/12 animate-pulse rounded bg-muted" />
                <div className="h-3 w-11/12 animate-pulse rounded bg-muted" />
              </div>
            )}

            {result && !mutation.isPending && (
              <div className="space-y-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Subject
                  </p>
                  <p className="mt-1 font-display text-lg font-semibold leading-snug">{result.subject}</p>
                </div>
                <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
                  <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground">
                    {result.body}
                  </pre>
                </div>
                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>{result.body.length} characters</span>
                  <span>{result.body.split(/\s+/).filter(Boolean).length} words</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" onClick={copyEmail}>
                    <Copy className="h-3.5 w-3.5" /> Copy
                  </Button>
                  <Button size="sm" variant="outline" onClick={download}>
                    <Download className="h-3.5 w-3.5" /> Download
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => mutation.mutate()}
                    disabled={mutation.isPending}
                  >
                    <RefreshCcw className="h-3.5 w-3.5" /> Regenerate
                  </Button>
                </div>
              </div>
            )}
          </Card>

          <AiDisclaimer />
        </div>
      </div>
    </div>
  );
}
