import { createFileRoute, useParams } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputSubmit,
  type PromptInputMessage,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { AiDisclaimer } from "@/components/AiDisclaimer";
import { getThread, useChatThreads } from "@/hooks/use-chat-threads";
import { Sparkles, MessagesSquare } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/chat/$threadId")({
  component: ChatThreadPage,
});

const SUGGESTIONS = [
  "Help me prep for a 1:1 with my manager",
  "Draft a polite decline to a meeting invite",
  "How do I prioritize a chaotic week?",
  "Summarize this so I can share with my team",
];

function ChatThreadPage() {
  const { threadId } = useParams({ from: "/chat/$threadId" });
  return <ChatWindow key={threadId} threadId={threadId} />;
}

function ChatWindow({ threadId }: { threadId: string }) {
  const { saveMessages } = useChatThreads();
  const initial = useMemo<UIMessage[]>(() => getThread(threadId)?.messages ?? [], [threadId]);

  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/chat" }), []);
  const { messages, sendMessage, status, error } = useChat({
    id: threadId,
    messages: initial,
    transport,
    onError: (e) => {
      toast.error(e instanceof Error ? e.message : "Chat failed");
    },
  });

  // Persist on settle.
  const lastSaved = useRef<string>("");
  useEffect(() => {
    if (status === "submitted" || status === "streaming") return;
    const serialized = JSON.stringify(messages);
    if (serialized === lastSaved.current) return;
    lastSaved.current = serialized;
    saveMessages(threadId, messages);
  }, [messages, status, threadId, saveMessages]);

  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [threadId, status]);

  const handleSubmit = (msg: PromptInputMessage) => {
    const text = (msg.text ?? "").trim();
    if (!text) return;
    sendMessage({ text });
  };

  const sendSuggestion = (text: string) => sendMessage({ text });

  const isLoading = status === "submitted" || status === "streaming";

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <Conversation className="flex-1">
        <ConversationContent className="mx-auto w-full max-w-3xl px-4 py-6">
          {messages.length === 0 ? (
            <ConversationEmptyState
              icon={
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-hero text-primary-foreground shadow-glow">
                  <Sparkles className="h-6 w-6" />
                </div>
              }
              title="How can I help you work smarter?"
              description="Ask about planning, communication, or any workplace topic."
            >
              <div className="mt-4 grid w-full max-w-xl gap-2 sm:grid-cols-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => sendSuggestion(s)}
                    className="rounded-xl border border-border/60 bg-card p-3 text-left text-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-elegant"
                  >
                    <MessagesSquare className="mb-1.5 h-4 w-4 text-primary" />
                    {s}
                  </button>
                ))}
              </div>
            </ConversationEmptyState>
          ) : (
            <div className="space-y-1">
              {messages.map((m) => (
                <Message key={m.id} from={m.role as "user" | "assistant"}>
                  <MessageContent>
                    {m.parts.map((part, i) => {
                      if (part.type === "text") {
                        return m.role === "assistant" ? (
                          <MessageResponse key={i}>{part.text}</MessageResponse>
                        ) : (
                          <span key={i} className="whitespace-pre-wrap">{part.text}</span>
                        );
                      }
                      return null;
                    })}
                  </MessageContent>
                </Message>
              ))}
              {status === "submitted" && (
                <Message from="assistant">
                  <MessageContent>
                    <Shimmer>Thinking…</Shimmer>
                  </MessageContent>
                </Message>
              )}
              {error && (
                <div className="mx-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
                  {error.message || "Something went wrong."}
                </div>
              )}
            </div>
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="border-t border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto w-full max-w-3xl p-3 sm:p-4">
          <PromptInput onSubmit={handleSubmit}>
            <PromptInputTextarea
              ref={inputRef}
              placeholder="Ask WorkSmart anything about your work…"
            />
            <PromptInputFooter className="justify-end">
              <PromptInputSubmit status={status} disabled={isLoading} />
            </PromptInputFooter>
          </PromptInput>
          <AiDisclaimer className="mt-3" />
        </div>
      </div>
    </div>
  );
}
