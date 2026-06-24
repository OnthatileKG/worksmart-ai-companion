import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Settings as SettingsIcon } from "lucide-react";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — WorkSmart AI" },
      { name: "description", content: "Manage your WorkSmart preferences and profile." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 p-4 sm:p-6 lg:p-8">
      <header className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-elegant">
          <SettingsIcon className="h-5 w-5" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold sm:text-3xl">Settings</h1>
          <p className="text-sm text-muted-foreground">Personalize your WorkSmart experience.</p>
        </div>
      </header>

      <Card className="space-y-4 border-border/60 p-6 shadow-sm">
        <h2 className="font-display text-base font-semibold">Profile</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="name">Display name</Label>
            <Input id="name" defaultValue="You" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="you@worksmart.ai" />
          </div>
        </div>
      </Card>

      <Card className="space-y-4 border-border/60 p-6 shadow-sm">
        <h2 className="font-display text-base font-semibold">Preferences</h2>
        <Row label="Email notifications" desc="Daily productivity digest." />
        <Row label="Smart reminders" desc="Nudge me about due tasks." defaultChecked />
        <Row label="Compact mode" desc="Denser layout across the app." />
      </Card>

      <div className="flex justify-end">
        <Button className="bg-gradient-primary text-primary-foreground shadow-elegant">
          Save changes
        </Button>
      </div>
    </div>
  );
}

function Row({ label, desc, defaultChecked = false }: { label: string; desc: string; defaultChecked?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-border/60 bg-muted/30 p-4">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}
