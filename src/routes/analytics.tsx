import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — WorkSmart AI" },
      {
        name: "description",
        content: "Productivity analytics: emails generated, tasks completed, and AI usage trends.",
      },
    ],
  }),
  component: AnalyticsPage,
});

const weekly = [
  { day: "Mon", emails: 12, tasks: 8 },
  { day: "Tue", emails: 18, tasks: 10 },
  { day: "Wed", emails: 9, tasks: 12 },
  { day: "Thu", emails: 22, tasks: 7 },
  { day: "Fri", emails: 16, tasks: 9 },
  { day: "Sat", emails: 4, tasks: 2 },
  { day: "Sun", emails: 2, tasks: 1 },
];

const usage = [
  { name: "Email", value: 42 },
  { name: "Planner", value: 28 },
  { name: "Chatbot", value: 30 },
];

const colors = ["oklch(0.55 0.22 280)", "oklch(0.70 0.18 25)", "oklch(0.78 0.17 75)"];

function AnalyticsPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      <header className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-secondary text-accent-foreground shadow-elegant">
          <BarChart3 className="h-5 w-5" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold sm:text-3xl">Analytics</h1>
          <p className="text-sm text-muted-foreground">How you're using WorkSmart this week.</p>
        </div>
      </header>

      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <Card className="border-border/60 p-5 shadow-sm">
          <h3 className="font-display text-base font-semibold">Productivity trend</h3>
          <p className="text-xs text-muted-foreground">Emails generated & tasks completed</p>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weekly}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.55 0.22 280)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="oklch(0.55 0.22 280)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.70 0.18 25)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="oklch(0.70 0.18 25)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.012 270)" />
                <XAxis dataKey="day" stroke="oklch(0.52 0.03 265)" fontSize={12} />
                <YAxis stroke="oklch(0.52 0.03 265)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                />
                <Area type="monotone" dataKey="emails" stroke="oklch(0.55 0.22 280)" fill="url(#g1)" strokeWidth={2} />
                <Area type="monotone" dataKey="tasks" stroke="oklch(0.70 0.18 25)" fill="url(#g2)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="border-border/60 p-5 shadow-sm">
          <h3 className="font-display text-base font-semibold">AI usage breakdown</h3>
          <p className="text-xs text-muted-foreground">Where your requests are going</p>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={usage} dataKey="value" nameKey="name" innerRadius={50} outerRadius={85} paddingAngle={4}>
                  {usage.map((_, i) => (
                    <Cell key={i} fill={colors[i]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="border-border/60 p-5 shadow-sm">
        <h3 className="font-display text-base font-semibold">Weekly task completion</h3>
        <div className="mt-4 h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weekly}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.012 270)" />
              <XAxis dataKey="day" stroke="oklch(0.52 0.03 265)" fontSize={12} />
              <YAxis stroke="oklch(0.52 0.03 265)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  fontSize: 12,
                }}
              />
              <Bar dataKey="tasks" fill="oklch(0.55 0.22 280)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
