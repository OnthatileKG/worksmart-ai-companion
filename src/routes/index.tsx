import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AiDisclaimer } from "@/components/AiDisclaimer";
import {
  Mail,
  CalendarRange,
  MessagesSquare,
  CheckCircle2,
  Clock,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Activity,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — WorkSmart AI Assistant" },
      {
        name: "description",
        content:
          "Your AI productivity dashboard: email generator, smart task planner, and workplace assistant in one place.",
      },
      { property: "og:title", content: "WorkSmart AI Assistant Dashboard" },
      {
        property: "og:description",
        content: "AI-powered productivity: drafted emails, planned days, and a workplace chatbot.",
      },
    ],
  }),
  component: Dashboard,
});

const stats = [
  { label: "Emails generated", value: 128, delta: "+12 this week", icon: Mail, accent: "from-primary to-primary-glow" },
  { label: "Tasks completed", value: 47, delta: "+8 today", icon: CheckCircle2, accent: "from-success to-warning" },
  { label: "Pending tasks", value: 9, delta: "3 due today", icon: Clock, accent: "from-accent to-warning" },
  { label: "Productivity score", value: "86%", delta: "+4 vs last wk", icon: TrendingUp, accent: "from-primary-glow to-accent" },
];

const quickActions = [
  { title: "Draft an email", description: "Pick a tone, get a polished draft.", url: "/email", icon: Mail, gradient: "bg-gradient-primary" },
  { title: "Plan my day", description: "Turn your task list into a schedule.", url: "/planner", icon: CalendarRange, gradient: "bg-gradient-secondary" },
  { title: "Ask the assistant", description: "Chat about anything work-related.", url: "/chat", icon: MessagesSquare, gradient: "bg-gradient-hero" },
];

const activity = [
  { icon: Mail, title: "Follow-up email to Sarah", time: "2m ago", tone: "Friendly" },
  { icon: CalendarRange, title: "Weekly plan generated", time: "1h ago", tone: "12 tasks" },
  { icon: MessagesSquare, title: "Chat: 'How do I run a great 1:1?'", time: "Yesterday", tone: "Assistant" },
  { icon: Mail, title: "Apology email to client", time: "Yesterday", tone: "Apology" },
];

function Dashboard() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-hero p-6 text-primary-foreground shadow-elegant sm:p-8">
        <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
        <div className="relative z-10 grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              Good to see you back
            </div>
            <h1 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl">
              Welcome to WorkSmart AI
            </h1>
            <p className="mt-2 max-w-xl text-sm text-primary-foreground/85 sm:text-base">
              Draft workplace emails, plan your day, and chat with an AI assistant built for
              professionals. One unified productivity dashboard.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                <Link to="/email">
                  <Mail className="h-4 w-4" /> New email
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/40 bg-white/10 text-white hover:bg-white/20"
              >
                <Link to="/planner">
                  <CalendarRange className="h-4 w-4" /> Plan my day
                </Link>
              </Button>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary-foreground/70">
                <Activity className="h-3.5 w-3.5" /> Today's focus
              </div>
              <p className="mt-2 text-sm font-medium">Inbox zero by 11:00 — deep work block 11:30–13:00</p>
              <Progress value={64} className="mt-3 h-1.5 bg-white/20 [&>div]:bg-white" />
            </div>
            <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary-foreground/70">
                <Zap className="h-3.5 w-3.5" /> AI insight
              </div>
              <p className="mt-2 text-sm font-medium">
                You ship 28% more on days you batch email after lunch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="overflow-hidden border-border/60 p-4 shadow-sm transition hover:shadow-elegant">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">{s.label}</p>
                <p className="mt-1 font-display text-2xl font-bold sm:text-3xl">{s.value}</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">{s.delta}</p>
              </div>
              <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${s.accent} text-white shadow-elegant`}>
                <s.icon className="h-5 w-5" />
              </div>
            </div>
          </Card>
        ))}
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* Quick actions */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Quick actions</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {quickActions.map((q) => (
              <Link
                key={q.url}
                to={q.url}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-elegant"
              >
                <div className={`mb-4 grid h-11 w-11 place-items-center rounded-xl text-primary-foreground shadow-elegant ${q.gradient}`}>
                  <q.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-base font-semibold">{q.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{q.description}</p>
                <ArrowRight className="absolute right-4 top-4 h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
              </Link>
            ))}
          </div>

          <Card className="mt-6 border-border/60 p-5 shadow-sm">
            <h3 className="font-display text-base font-semibold">Schedule summary</h3>
            <p className="text-xs text-muted-foreground">Your AI-generated focus blocks for today.</p>
            <div className="mt-4 space-y-2">
              {[
                { t: "09:00 – 10:30", task: "Deep work: Q4 roadmap", p: "High" },
                { t: "10:30 – 11:00", task: "Inbox triage", p: "Medium" },
                { t: "11:30 – 13:00", task: "Design review prep", p: "High" },
                { t: "14:00 – 15:00", task: "1:1 with Maya", p: "Medium" },
              ].map((row) => (
                <div
                  key={row.t}
                  className="flex items-center gap-3 rounded-xl border border-border/50 bg-muted/30 px-3 py-2.5"
                >
                  <span className="w-24 shrink-0 font-mono text-xs text-muted-foreground">{row.t}</span>
                  <span className="flex-1 truncate text-sm">{row.task}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${row.p === "High" ? "bg-accent/15 text-accent" : "bg-primary/10 text-primary"}`}>
                    {row.p}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Activity */}
        <section>
          <h2 className="mb-3 font-display text-lg font-semibold">Recent activity</h2>
          <Card className="border-border/60 p-2 shadow-sm">
            <ul className="divide-y divide-border/50">
              {activity.map((a, i) => (
                <li key={i} className="flex items-center gap-3 p-3">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-primary text-primary-foreground">
                    <a.icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{a.title}</p>
                    <p className="text-[11px] text-muted-foreground">{a.time} · {a.tone}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="mt-4 border-border/60 bg-gradient-surface p-5 shadow-sm">
            <h3 className="font-display text-base font-semibold">AI usage this week</h3>
            <div className="mt-3 space-y-3 text-sm">
              <Row label="Email generator" value={64} />
              <Row label="Task planner" value={38} />
              <Row label="Chatbot" value={82} />
            </div>
          </Card>

          <AiDisclaimer className="mt-4" />
        </section>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold">{value}%</span>
      </div>
      <Progress value={value} className="h-1.5" />
    </div>
  );
}
