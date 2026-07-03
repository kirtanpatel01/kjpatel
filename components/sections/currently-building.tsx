"use client";

import {
  Calendar,
  Cpu,
  Mail,
  Settings,
  Sparkles,
} from "lucide-react";
import { SectionContainer } from "../responsive-wrappers";
import { Badge } from "../ui/badge";

export default function CurrentlyBuilding() {
  return (
    <SectionContainer
      id="currently-building"
      className="space-y-6 scroll-mt-24"
    >
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            Currently Building
          </span>
        </div>
        <h3 className="text-3xl font-black tracking-tight">
          AI Email Assistant
        </h3>
        <p className="text-sm text-muted-foreground max-w-xl">
          An AI-powered scheduling assistant that understands natural language
          emails, extracts meeting requests, checks calendar availability, and
          automatically coordinates events using modern LLM workflows.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Core Description - Left Column */}
        <div className="lg:col-span-7 space-y-4">
          <p className="text-base text-foreground/80 leading-relaxed">
            I am building an autonomous assistant designed to automate email
            scheduling coordination. The system securely intercepts email
            bodies, feeds them through localized LLM parsing prompts,
            cross-references calendars for free slots, resolves conflicts, and
            writes event templates back to the calendar API directly.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            <Badge
              variant="secondary"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-border bg-accent/20 text-xs font-medium"
            >
              <Mail size={12} className="text-muted-foreground" />
              <span>Gmail API</span>
            </Badge>
            <Badge
              variant="secondary"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-border bg-accent/20 text-xs font-medium"
            >
              <Calendar size={12} className="text-muted-foreground" />
              <span>Google Calendar</span>
            </Badge>
            <Badge
              variant="secondary"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-border bg-accent/20 text-xs font-medium"
            >
              <Cpu size={12} className="text-muted-foreground" />
              <span>MCP</span>
            </Badge>
            <Badge
              variant="secondary"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-border bg-accent/20 text-xs font-medium"
            >
              <Sparkles size={12} className="text-muted-foreground" />
              <span>LLMs</span>
            </Badge>
            <Badge
              variant="secondary"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-border bg-accent/20 text-xs font-medium"
            >
              <Settings size={12} className="text-muted-foreground" />
              <span>AI Automation</span>
            </Badge>
          </div>
        </div>

        {/* Visual Architecture Flow - Right Column */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-muted/5 flex flex-col gap-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Execution Workflow Flow
          </span>

          <div className="flex flex-col gap-2 font-mono text-xs text-foreground/80">
            {/* Step 1 */}
            <div className="flex items-center gap-3 p-3 rounded-xl border border-dashed border-border bg-background shadow-sm hover:border-primary/30 transition-colors">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
              <span className="font-bold text-foreground">Incoming Email</span>
            </div>

            <div className="text-center text-muted-foreground/60 leading-none py-0.5">
              ↓
            </div>

            {/* Step 2 */}
            <div className="flex items-center gap-3 p-3 rounded-xl border border-dashed border-border bg-background shadow-sm hover:border-primary/30 transition-colors">
              <div className="w-2.5 h-2.5 rounded-full bg-primary shrink-0 animate-pulse" />
              <span className="font-bold text-foreground">
                AI extracts meeting intent
              </span>
            </div>

            <div className="text-center text-muted-foreground/60 leading-none py-0.5">
              ↓
            </div>

            {/* Step 3 */}
            <div className="flex items-center gap-3 p-3 rounded-xl border border-dashed border-border bg-background shadow-sm hover:border-primary/30 transition-colors">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
              <span className="font-bold text-foreground">
                Availability lookup
              </span>
            </div>

            <div className="text-center text-muted-foreground/60 leading-none py-0.5">
              ↓
            </div>

            {/* Step 4 */}
            <div className="flex items-center gap-3 p-3 rounded-xl border border-dashed border-border bg-background shadow-sm hover:border-primary/30 transition-colors">
              <div className="w-2.5 h-2.5 rounded-full bg-orange-500 shrink-0" />
              <span className="font-bold text-foreground">
                Conflict resolution
              </span>
            </div>

            <div className="text-center text-muted-foreground/60 leading-none py-0.5">
              ↓
            </div>

            {/* Step 5 */}
            <div className="flex items-center gap-3 p-3 rounded-xl border border-dashed border-border bg-background shadow-sm hover:border-primary/30 transition-colors">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
              <span className="font-bold text-foreground">
                Calendar event created
              </span>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
