import { createFileRoute } from "@tanstack/react-router";
import { useChatThreads } from "@/hooks/use-chat-threads";
import { Card } from "@/components/ui/card";
import { History, MessagesSquare } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "History — WorkSmart AI" },
      { name: "description", content: "Browse your past AI chats with WorkSmart." },
    ],
  }),
  component: HistoryPage,
});

function HistoryPage() {
  const { threads, hydrated } = useChatThreads();
  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 p-4 sm:p-6 lg:p-8">
      <header className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-elegant">
          <History className="h-5 w-5" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold sm:text-3xl">History</h1>
          <p className="text-sm text-muted-foreground">Your saved AI conversations.</p>
        </div>
      </header>

      <Card className="border-border/60 p-2 shadow-sm">
        {!hydrated && <div className="p-6 text-sm text-muted-foreground">Loading…</div>}
        {hydrated && threads.length === 0 && (
          <div className="p-10 text-center text-sm text-muted-foreground">
            No conversations yet. <Link to="/chat" className="text-primary underline">Start a chat</Link>.
          </div>
        )}
        <ul className="divide-y divide-border/50">
          {threads.map((t) => (
            <li key={t.id}>
              <Link
                to="/chat/$threadId"
                params={{ threadId: t.id }}
                className="flex items-center gap-3 p-4 transition hover:bg-muted/40"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-primary text-primary-foreground">
                  <MessagesSquare className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{t.title}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {t.messages.length} messages · {new Date(t.updatedAt).toLocaleString()}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
