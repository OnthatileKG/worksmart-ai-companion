import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createLovableGateway, DEFAULT_MODEL } from "@/lib/ai-gateway.server";

const SYSTEM_PROMPT = `You are WorkSmart, an AI workplace productivity assistant. You help professionals with:
- Planning their day and prioritizing tasks
- Drafting clear, professional workplace communication
- Improving focus, productivity, and time management
- Workplace etiquette, meeting prep, and process advice

Be concise, warm, and practical. Use short paragraphs and bullet lists where helpful. Format your answers in markdown.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { messages } = (await request.json()) as { messages?: UIMessage[] };
          if (!Array.isArray(messages)) {
            return new Response("messages required", { status: 400 });
          }
          const gateway = createLovableGateway();
          const result = streamText({
            model: gateway(DEFAULT_MODEL),
            system: SYSTEM_PROMPT,
            messages: await convertToModelMessages(messages),
          });
          return result.toUIMessageStreamResponse({ originalMessages: messages });
        } catch (e) {
          const msg = e instanceof Error ? e.message : "Unknown error";
          return new Response(msg, { status: 500 });
        }
      },
    },
  },
});
