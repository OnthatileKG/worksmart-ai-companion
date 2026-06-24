import { createFileRoute, Outlet, useNavigate, useParams, Link, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { useChatThreads } from "@/hooks/use-chat-threads";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessagesSquare, Plus, Trash2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Workplace Chatbot — WorkSmart AI" },
      {
        name: "description",
        content:
          "Chat with WorkSmart, your AI workplace assistant for planning, communication, and productivity.",
      },
      { property: "og:title", content: "AI Workplace Chatbot" },
      {
        property: "og:description",
        content: "Conversational AI assistant for everyday work questions and planning.",
      },
    ],
  }),
  component: ChatLayout,
});

function ChatLayout() {
  const { threads, hydrated, create, remove } = useChatThreads();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const activeId = pathname.startsWith("/chat/") ? pathname.slice("/chat/".length) : null;

  // Bootstrap: if landing on /chat and a thread exists, open the latest one.
  useEffect(() => {
    if (!hydrated) return;
    if (pathname === "/chat" && threads.length > 0) {
      navigate({ to: "/chat/$threadId", params: { threadId: threads[0].id }, replace: true });
    }
  }, [hydrated, pathname, threads, navigate]);

  const startNew = () => {
    const t = create();
    navigate({ to: "/chat/$threadId", params: { threadId: t.id } });
  };

  return (
    <div className="flex h-[calc(100vh-3.5rem)] min-w-0">
      {/* Thread list */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border/60 bg-card/40 md:flex">
        <div className="border-b border-border/60 p-3">
          <Button
            onClick={startNew}
            className="w-full bg-gradient-primary text-primary-foreground shadow-elegant"
          >
            <Plus className="h-4 w-4" /> New chat
          </Button>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-2">
            {!hydrated && (
              <div className="px-2 py-6 text-center text-xs text-muted-foreground">Loading…</div>
            )}
            {hydrated && threads.length === 0 && (
              <div className="px-3 py-6 text-center text-xs text-muted-foreground">
                No conversations yet.
              </div>
            )}
            <ul className="space-y-0.5">
              {threads.map((t) => {
                const isActive = t.id === activeId;
                return (
                  <li key={t.id} className="group relative">
                    <Link
                      to="/chat/$threadId"
                      params={{ threadId: t.id }}
                      className={cn(
                        "flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm transition",
                        isActive
                          ? "bg-primary/10 text-foreground"
                          : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                      )}
                    >
                      <MessagesSquare className="h-3.5 w-3.5 shrink-0" />
                      <span className="min-w-0 flex-1 truncate">{t.title}</span>
                    </Link>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        remove(t.id);
                        if (isActive) navigate({ to: "/chat" });
                      }}
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground opacity-0 transition hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
                      aria-label="Delete conversation"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </ScrollArea>
      </aside>

      {/* Active chat or empty state */}
      <div className="flex min-w-0 flex-1 flex-col">
        {pathname === "/chat" ? (
          <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
            <div className="grid h-16 w-16 place-items-center rounded-3xl bg-gradient-hero text-primary-foreground shadow-glow">
              <Sparkles className="h-7 w-7" />
            </div>
            <h2 className="mt-5 font-display text-2xl font-bold">Meet WorkSmart</h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Your AI workplace assistant. Ask about planning, communication, productivity tips, or
              anything else work-related.
            </p>
            <Button
              onClick={startNew}
              size="lg"
              className="mt-6 bg-gradient-primary text-primary-foreground shadow-elegant"
            >
              <Plus className="h-4 w-4" /> Start a new chat
            </Button>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}
