import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { LifeBuoy, Mail, CalendarRange, MessagesSquare } from "lucide-react";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help Center — WorkSmart AI" },
      { name: "description", content: "Learn how to get the most out of WorkSmart AI." },
    ],
  }),
  component: HelpPage,
});

const tiles = [
  {
    title: "Smart Email Generator",
    icon: Mail,
    body: "Provide a recipient, purpose, tone, and any key facts. Tap Generate, then copy or download the result.",
    url: "/email",
  },
  {
    title: "Task Planner",
    icon: CalendarRange,
    body: "Add tasks with priorities and durations, choose daily or weekly, and let WorkSmart build a schedule.",
    url: "/planner",
  },
  {
    title: "Chatbot Assistant",
    icon: MessagesSquare,
    body: "Ask anything work-related. Conversations are saved in your browser so you can revisit them anytime.",
    url: "/chat",
  },
];

function HelpPage() {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 p-4 sm:p-6 lg:p-8">
      <header className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-secondary text-accent-foreground shadow-elegant">
          <LifeBuoy className="h-5 w-5" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold sm:text-3xl">Help Center</h1>
          <p className="text-sm text-muted-foreground">Quick guides for each module.</p>
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map((t) => (
          <Link key={t.url} to={t.url}>
            <Card className="h-full border-border/60 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-elegant">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-elegant">
                <t.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-3 font-display text-base font-semibold">{t.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.body}</p>
            </Card>
          </Link>
        ))}
      </div>

      <Card className="border-border/60 p-6 shadow-sm">
        <h2 className="font-display text-base font-semibold">About AI-generated content</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          WorkSmart uses generative AI. Output is provided for assistance only — please review and verify
          all generated information before professional, academic, or business use.
        </p>
      </Card>
    </div>
  );
}
