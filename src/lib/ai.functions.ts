import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { z } from "zod";

const EmailInput = z.object({
  recipientName: z.string().max(120).optional().default(""),
  recipientEmail: z.string().max(200).optional().default(""),
  purpose: z.string().min(3).max(2000),
  keyInfo: z.string().max(4000).optional().default(""),
  tone: z.enum(["formal", "friendly", "professional", "persuasive", "apology", "follow-up"]),
  additional: z.string().max(2000).optional().default(""),
});

export const generateEmail = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => EmailInput.parse(d))
  .handler(async ({ data }) => {
    const { createLovableGateway, DEFAULT_MODEL } = await import("./ai-gateway.server");
    const gateway = createLovableGateway();

    const prompt = `Write a workplace email with the following details.

Recipient name: ${data.recipientName || "(unspecified)"}
Recipient email: ${data.recipientEmail || "(unspecified)"}
Purpose: ${data.purpose}
Key information to include: ${data.keyInfo || "(none provided)"}
Tone: ${data.tone}
Additional instructions: ${data.additional || "(none)"}

Return ONLY valid JSON, no markdown fences, no commentary, in this exact shape:
{"subject": "...", "body": "..."}

Rules:
- "subject" is a single concise line, under 80 characters.
- "body" is the full email body in plain text with line breaks, including greeting and sign-off.
- Match the requested tone precisely.
- Do not invent facts not provided.`;

    const { text } = await generateText({
      model: gateway(DEFAULT_MODEL),
      prompt,
    });

    const cleaned = text.trim().replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "");
    try {
      const parsed = JSON.parse(cleaned) as { subject: string; body: string };
      return parsed;
    } catch {
      // Fallback: treat whole text as body
      return { subject: data.purpose.slice(0, 70), body: cleaned };
    }
  });

const PlannerInput = z.object({
  tasks: z
    .array(
      z.object({
        name: z.string().min(1).max(200),
        description: z.string().max(1000).optional().default(""),
        priority: z.enum(["low", "medium", "high", "urgent"]),
        dueDate: z.string().max(50).optional().default(""),
        duration: z.string().max(50).optional().default(""),
      }),
    )
    .min(1)
    .max(30),
  workingHours: z.string().max(100).optional().default("09:00 - 17:00"),
  scheduleType: z.enum(["daily", "weekly"]),
  notes: z.string().max(2000).optional().default(""),
});

export type PlannerResult = {
  summary: string;
  insights: string[];
  blocks: Array<{
    day?: string;
    start: string;
    end: string;
    task: string;
    priority: "low" | "medium" | "high" | "urgent";
    note?: string;
  }>;
};

export const generatePlan = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => PlannerInput.parse(d))
  .handler(async ({ data }): Promise<PlannerResult> => {
    const { createLovableGateway, DEFAULT_MODEL } = await import("./ai-gateway.server");
    const gateway = createLovableGateway();

    const taskList = data.tasks
      .map(
        (t, i) =>
          `${i + 1}. ${t.name} — priority: ${t.priority}${t.duration ? `, est: ${t.duration}` : ""}${t.dueDate ? `, due: ${t.dueDate}` : ""}${t.description ? `\n   notes: ${t.description}` : ""}`,
      )
      .join("\n");

    const prompt = `You are a productivity coach. Build a ${data.scheduleType} schedule.

Working hours: ${data.workingHours}
Schedule type: ${data.scheduleType}
User notes: ${data.notes || "(none)"}

Tasks:
${taskList}

Return ONLY valid JSON (no markdown fences) in this exact shape:
{
  "summary": "1-2 sentence overview of the plan",
  "insights": ["short productivity tip", "another tip", "..."],
  "blocks": [
    { ${data.scheduleType === "weekly" ? `"day": "Monday", ` : ""}"start": "09:00", "end": "10:30", "task": "Task name", "priority": "high", "note": "why scheduled here" }
  ]
}

Rules:
- Order tasks by urgency × importance. Highest priority items go in deep-focus morning blocks.
- Include short breaks between heavy tasks.
- For weekly schedules use day names Monday-Friday.
- Provide 3-5 concise productivity insights.
- Keep "note" under 90 characters.
- Use 24h "HH:MM" time format.`;

    const { text } = await generateText({
      model: gateway(DEFAULT_MODEL),
      prompt,
    });

    const cleaned = text.trim().replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "");
    try {
      return JSON.parse(cleaned) as PlannerResult;
    } catch {
      return {
        summary: "Could not parse AI response. Showing tasks in priority order.",
        insights: ["Try regenerating the plan with simpler task names."],
        blocks: data.tasks.map((t, i) => ({
          start: `${String(9 + i).padStart(2, "0")}:00`,
          end: `${String(10 + i).padStart(2, "0")}:00`,
          task: t.name,
          priority: t.priority,
        })),
      };
    }
  });
