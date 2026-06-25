# WorkSmart AI Assistant

> AI-powered workplace productivity platform: email generator, task planner, and workplace chatbot in one dashboard.

![WorkSmart AI](https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/a2f879a7-88db-481c-b02e-444a9ff0940f/id-preview-5b4614e9--db31906e-96f1-400c-be58-bf8a743387c6.lovable.app-1782320970554.png)

---

## Overview

**WorkSmart AI Assistant** is a modern, full-stack AI productivity web application built for professionals and teams. It combines three core AI modules into a single, unified platform:

- **Smart Email Generator** — Generate professional emails in multiple tones (Formal, Friendly, Professional, Persuasive, Apology, Follow-up).
- **AI Task Planner** — Transform task lists into prioritized daily or weekly schedules with AI productivity insights.
- **Workplace Chatbot** — Conversational AI assistant for work-related questions, with threaded local history.

The project demonstrates software engineering, web development, AI integration, database management, UI/UX design, and full-stack development skills — ideal for a final-year Information Technology project.

---

## Tech Stack

- **Framework:** [TanStack Start](https://tanstack.com/start) — full-stack React 19 with SSR support
- **Router:** [TanStack Router](https://tanstack.com/router) — file-based, type-safe routing
- **Build Tool:** [Vite 7](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components:** shadcn/ui
- **AI SDK:** [Vercel AI SDK](https://sdk.vercel.ai/)
- **Charts:** [Recharts](https://recharts.org/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Package Manager:** [Bun](https://bun.sh/)
- **Runtime:** Edge-compatible (Cloudflare Workers)

---

## Features

### Core Modules

| Module | Description | Route |
|--------|-------------|-------|
| **Dashboard** | Productivity overview, stats, quick actions, schedule summary, recent activity | `/` |
| **Smart Email Generator** | AI-powered email drafting with subject generation and multiple tones | `/email` |
| **AI Task Planner** | Daily/weekly planning, priority ranking, AI productivity insights | `/planner` |
| **Workplace Chatbot** | Interactive AI chat with threaded conversation history | `/chat` |
| **Analytics** | Visual usage trends and productivity metrics | `/analytics` |
| **History** | Recent AI-generated outputs across modules | `/history` |
| **Notifications** | In-app notifications and updates | `/notifications` |
| **Settings** | Application preferences and configuration | `/settings` |
| **Help Center** | User guides and documentation for each module | `/help` |

### Key Capabilities

- **AI Integration Layer** — Server-side AI gateway using Vercel AI SDK for streaming chat and structured generation.
- **Responsive Design** — Fully responsive sidebar navigation and mobile-optimized layouts.
- **Threaded Chat History** — Conversations saved in browser localStorage for persistence.
- **Glassmorphism UI** — Modern, enterprise-ready visual design with gradient accents.
- **Type-Safe Routing** — TanStack Router's file-based routing with full TypeScript safety.
- **Server Functions** — Edge-compatible server functions for AI generation tasks.
- **SEO & Meta Tags** — Unique titles and descriptions for each route.

---

## Project Structure

```text
WorkSmart AI Assistant/
├── public/                  # Static assets (robots.txt, llms.txt, images)
├── src/
│   ├── components/          # Reusable UI components and AI elements
│   │   ├── ai-elements/     # AI-specific UI components (conversation, message, prompt input)
│   │   ├── ui/              # shadcn/ui components
│   │   ├── AiDisclaimer.tsx
│   │   ├── AppLayout.tsx
│   │   └── AppSidebar.tsx
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utilities, AI functions, server gateway
│   ├── routes/              # TanStack Start file-based routes
│   │   ├── api/             # Server-side API endpoints
│   │   ├── __root.tsx       # Root layout
│   │   ├── index.tsx        # Dashboard
│   │   ├── email.tsx        # Email generator
│   │   ├── planner.tsx      # Task planner
│   │   ├── chat.tsx         # Chat list/threads
│   │   ├── chat.$threadId.tsx  # Individual chat thread
│   │   ├── analytics.tsx    # Analytics dashboard
│   │   ├── history.tsx      # History page
│   │   ├── notifications.tsx
│   │   ├── settings.tsx
│   │   └── help.tsx         # Help center
│   ├── styles.css           # Tailwind CSS v4 theme configuration
│   ├── router.tsx           # Router configuration
│   ├── server.ts            # Server configuration
│   ├── start.ts             # Start configuration
│   └── routeTree.gen.ts     # Auto-generated route tree
├── package.json
├── tsconfig.json
├── vite.config.ts
├── eslint.config.js
├── components.json
└── bun.lock
```

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed (recommended) or Node.js with npm/yarn/pnpm
- A modern web browser

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/worksmart-ai-assistant.git
   cd worksmart-ai-assistant
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

### Development

Start the development server:

```bash
bun dev
```

The application will be available at `http://localhost:8080` (or the port configured by Vite).

### Build

Create a production build:

```bash
bun run build
```

### Type Checking

Run TypeScript type checking without emitting files:

```bash
bunx tsgo --noEmit
```

---

## Deployment

This project is built on TanStack Start and targets Edge runtimes (e.g., Cloudflare Workers). It can be deployed to any platform that supports Vite-based full-stack React applications, including:

- **Lovable Cloud** (recommended for zero-config deployment)
- **Vercel**
- **Cloudflare Pages**
- **Netlify**
- **Self-hosted** via Docker or Node.js server

For Lovable deployment, connect your project to GitHub in the Lovable editor, and deploy directly from the platform.

---

## AI Configuration

The application uses a server-side AI gateway (`src/lib/ai-gateway.server.ts`) to centralize AI model calls. For local development, you may need to configure an AI provider API key via environment variables. Check the gateway configuration for supported providers and model names.

### Environment Variables

Create a `.env` file in the project root (if not already present) and add required keys:

```env
# Example — update based on your AI provider
AI_PROVIDER_API_KEY=your_api_key_here
```

> **Note:** Never commit API keys or secrets to version control. Use environment variables or a secure secret manager.

---

## Testing Strategy

The project is structured to support multiple layers of testing:

- **Unit Tests** — Component and utility tests with Vitest (recommended)
- **Integration Tests** — Server function and API endpoint tests
- **End-to-End Tests** — Playwright or Cypress for full user flows
- **Type Safety** — Strict TypeScript configuration catches a wide range of issues at build time

To run tests (when configured):

```bash
bun test
```

---

## Security Best Practices

- **Environment variables and API keys** are kept server-side and never exposed to the client.
- **No sensitive data** is hardcoded in components or route files.
- **User roles** (if added later) should be stored in a dedicated `user_roles` table with proper RLS policies.
- **Authentication** (if added later) should use secure, server-side session validation.
- **Input validation** is recommended for all server functions and API endpoints.
- **HTTPS** is enforced in production deployments.

---

## Roadmap

Future enhancements planned for WorkSmart AI Assistant:

- [ ] User authentication and cloud-synced history
- [ ] Persistent database storage for emails, plans, and chat threads
- [ ] Advanced analytics with exportable reports
- [ ] Team collaboration and shared workspaces
- [ ] Email templates and saved snippets
- [ ] Calendar integration for task planning
- [ ] Mobile app wrapper (PWA / Capacitor)
- [ ] Multi-language support
- [ ] Dark mode toggle refinement

---

## Documentation

- **[Help Center](/help)** — In-app guides for each module
- **[TanStack Start Docs](https://tanstack.com/start/latest/docs/overview)** — Framework documentation
- **[Tailwind CSS Docs](https://tailwindcss.com/docs)** — Styling reference
- **[Vercel AI SDK Docs](https://sdk.vercel.ai/docs)** — AI integration reference

---

## License

This project is intended for educational and demonstration purposes. Please add an appropriate license file (e.g., MIT, Apache 2.0) before public distribution.

---

## Acknowledgments

Built as a final-year Information Technology project to demonstrate:

- Software engineering principles
- Full-stack web development
- AI integration and prompt engineering
- Database and backend design
- UI/UX design and accessibility
- Modern deployment and DevOps practices

---

<p align="center">
  Built with ❤️ using <strong>TanStack Start</strong>, <strong>Tailwind CSS</strong>, and <strong>AI</strong>.
</p>
