"use client";

import * as React from "react";
import {
  ACCENT_THEMES,
  type AccentTheme,
  getStoredAccentTheme,
  applyAccentTheme,
} from "@/lib/accent-theme";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function AccentThemeRail() {
  const [activeTheme, setActiveTheme] = React.useState<AccentTheme>("zinc");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const initial = getStoredAccentTheme();
    setActiveTheme(initial);
    applyAccentTheme(initial);

    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<AccentTheme>;
      setActiveTheme(customEvent.detail);
    };

    window.addEventListener("accent-theme-change", handleThemeChange);
    return () =>
      window.removeEventListener("accent-theme-change", handleThemeChange);
  }, []);

  const handleSelect = (themeId: AccentTheme) => {
    setActiveTheme(themeId);
    applyAccentTheme(themeId);
  };

  if (!mounted) return null;

  return (
    <div
      aria-label="Color Theme Switcher"
      className="hidden xl:flex fixed xl:left-14 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-3.5 select-none"
    >
      {ACCENT_THEMES.map((theme) => {
        const isActive = activeTheme === theme.id;
        return (
          <Tooltip key={theme.id} delayDuration={100}>
            <TooltipTrigger asChild>
              <button
                onClick={() => handleSelect(theme.id)}
                type="button"
                aria-label={`Select ${theme.label} theme`}
                className={cn(
                  "relative group flex items-center justify-center p-1 rounded-full cursor-pointer transition-all duration-200 outline-none",
                  isActive
                    ? "opacity-100"
                    : "opacity-60 hover:opacity-100"
                )}
              >
                <span
                  className={cn(
                    "w-3.5 h-3.5 rounded-full transition-all duration-200 shadow-xs",
                    theme.dotColor,
                    isActive
                      ? `ring-2 ring-offset-2 ring-offset-background ${theme.ringColor}`
                      : ""
                  )}
                />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={12}>
              <p className="text-xs font-medium tracking-wide">{theme.label}</p>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
}

export function AccentThemeSelectorInline({ className }: { className?: string }) {
  const [activeTheme, setActiveTheme] = React.useState<AccentTheme>("zinc");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const initial = getStoredAccentTheme();
    setActiveTheme(initial);

    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<AccentTheme>;
      setActiveTheme(customEvent.detail);
    };

    window.addEventListener("accent-theme-change", handleThemeChange);
    return () =>
      window.removeEventListener("accent-theme-change", handleThemeChange);
  }, []);

  const handleSelect = (themeId: AccentTheme) => {
    setActiveTheme(themeId);
    applyAccentTheme(themeId);
  };

  if (!mounted) return null;

  return (
    <div className={cn("flex items-center gap-2 select-none", className)}>
      {ACCENT_THEMES.map((theme) => {
        const isActive = activeTheme === theme.id;
        return (
          <button
            key={theme.id}
            onClick={() => handleSelect(theme.id)}
            type="button"
            title={`${theme.label} Theme`}
            aria-label={`Select ${theme.label} theme`}
            className={cn(
              "p-0.5 rounded-full cursor-pointer transition-all duration-200 outline-none",
              isActive ? "opacity-100" : "opacity-60 hover:opacity-100"
            )}
          >
            <span
              className={cn(
                "block w-3 h-3 rounded-full transition-all duration-200",
                theme.dotColor,
                isActive
                  ? `ring-2 ring-offset-1 ring-offset-background ${theme.ringColor}`
                  : ""
              )}
            />
          </button>
        );
      })}
    </div>
  );
}

import { Palette, Check } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

export function AccentThemePopover({ className }: { className?: string }) {
  const [activeTheme, setActiveTheme] = React.useState<AccentTheme>("zinc");
  const [mounted, setMounted] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const initial = getStoredAccentTheme();
    setActiveTheme(initial);

    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<AccentTheme>;
      setActiveTheme(customEvent.detail);
    };

    window.addEventListener("accent-theme-change", handleThemeChange);
    return () =>
      window.removeEventListener("accent-theme-change", handleThemeChange);
  }, []);

  const handleSelect = (themeId: AccentTheme) => {
    setActiveTheme(themeId);
    applyAccentTheme(themeId);
    setOpen(false);
  };

  if (!mounted) {
    return (
      <div className={cn("h-8 w-8 shrink-0 rounded-full border border-border/50", className)} />
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="Change Accent Theme"
          className={cn(
            "relative flex items-center justify-center cursor-pointer shrink-0 text-muted-foreground hover:text-foreground transition-colors duration-150 p-1 outline-none",
            className
          )}
        >
          <Palette className="w-4 h-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-auto p-2 backdrop-blur-md bg-background/95 border-border shadow-xl rounded-full select-none"
      >
        <div className="flex flex-row items-center gap-2.5">
          {ACCENT_THEMES.map((theme) => {
            const isActive = activeTheme === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => handleSelect(theme.id)}
                type="button"
                title={`${theme.label} Theme`}
                aria-label={`Select ${theme.label} theme`}
                className={cn(
                  "p-0.5 rounded-full cursor-pointer transition-all duration-200 outline-none",
                  isActive ? "opacity-100" : "opacity-60 hover:opacity-100"
                )}
              >
                <span
                  className={cn(
                    "block w-4 h-4 rounded-full transition-all duration-200 shadow-xs",
                    theme.dotColor,
                    isActive
                      ? `ring-2 ring-offset-2 ring-offset-background ${theme.ringColor}`
                      : ""
                  )}
                />
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
