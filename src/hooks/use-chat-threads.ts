import { useEffect, useState, useCallback } from "react";
import type { UIMessage } from "ai";

export type ChatThread = {
  id: string;
  title: string;
  updatedAt: number;
  messages: UIMessage[];
};

const KEY = "worksmart.chat.threads.v1";

function readStore(): ChatThread[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ChatThread[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeStore(threads: ChatThread[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(threads));
  } catch {
    // ignore
  }
}

function makeId() {
  return "t_" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
}

export function newThread(title = "New conversation"): ChatThread {
  return { id: makeId(), title, updatedAt: Date.now(), messages: [] };
}

export function useChatThreads() {
  const [threads, setThreads] = useState<ChatThread[]>(() => readStore());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setThreads(readStore());
    setHydrated(true);
  }, []);

  const persist = useCallback((next: ChatThread[]) => {
    setThreads(next);
    writeStore(next);
  }, []);

  const create = useCallback((): ChatThread => {
    const t = newThread();
    persist([t, ...readStore()]);
    return t;
  }, [persist]);

  const remove = useCallback(
    (id: string) => {
      persist(readStore().filter((t) => t.id !== id));
    },
    [persist],
  );

  const rename = useCallback(
    (id: string, title: string) => {
      persist(readStore().map((t) => (t.id === id ? { ...t, title } : t)));
    },
    [persist],
  );

  const saveMessages = useCallback((id: string, messages: UIMessage[]) => {
    const all = readStore();
    const idx = all.findIndex((t) => t.id === id);
    if (idx === -1) return;
    // Derive title from first user message if still default.
    let title = all[idx].title;
    if (title === "New conversation") {
      const first = messages.find((m) => m.role === "user");
      if (first) {
        const text = first.parts
          .map((p) => (p.type === "text" ? p.text : ""))
          .join(" ")
          .trim();
        if (text) title = text.slice(0, 50);
      }
    }
    all[idx] = { ...all[idx], messages, title, updatedAt: Date.now() };
    all.sort((a, b) => b.updatedAt - a.updatedAt);
    persist(all);
  }, [persist]);

  return { threads, hydrated, create, remove, rename, saveMessages };
}

export function getThread(id: string): ChatThread | undefined {
  return readStore().find((t) => t.id === id);
}
