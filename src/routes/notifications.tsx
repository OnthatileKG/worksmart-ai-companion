import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Bell } from "lucide-react";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — WorkSmart AI" },
      { name: "description", content: "Your recent alerts and updates from WorkSmart." },
    ],
  }),
  component: NotificationsPage,
});

const items = [
  { title: "Weekly schedule is ready", time: "Just now", body: "Your AI-generated plan for next week is available." },
  { title: "Email draft saved", time: "1h ago", body: "Follow-up to Sarah Chen was saved to history." },
  { title: "Productivity tip", time: "Yesterday", body: "You complete 28% more on mornings with no meetings before 10am." },
];

function NotificationsPage() {
  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 p-4 sm:p-6 lg:p-8">
      <header className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-elegant">
          <Bell className="h-5 w-5" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold sm:text-3xl">Notifications</h1>
          <p className="text-sm text-muted-foreground">Updates from your AI assistant.</p>
        </div>
      </header>

      <Card className="border-border/60 p-2 shadow-sm">
        <ul className="divide-y divide-border/50">
          {items.map((n, i) => (
            <li key={i} className="flex items-start gap-3 p-4">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="truncate text-sm font-semibold">{n.title}</p>
                  <span className="shrink-0 text-[11px] text-muted-foreground">{n.time}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{n.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
