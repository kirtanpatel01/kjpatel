"use client";

import * as React from "react";
import {
  ACCENT_THEMES,
  type AccentTheme,
  getStoredAccentTheme,
  applyAccentTheme,
  cycleAccentTheme,
} from "@/lib/accent-theme";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Kbd } from "@/components/ui/kbd";
import { clickSoftSound } from "@/lib/click-soft";

export function AccentThemeRail() {
  const [activeTheme, setActiveTheme] = React.useState<AccentTheme>(() => getStoredAccentTheme());
  const [mounted, setMounted] = React.useState(false);

  const playSound = React.useCallback(() => {
    if (typeof window === "undefined") return;
    const audio = new Audio(clickSoftSound.dataUri);
    void audio.play().catch(() => {});
  }, []);

  const handleCycle = React.useCallback(() => {
    const next = cycleAccentTheme();
    setActiveTheme(next);
    playSound();
  }, [playSound]);

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

  // Handle 'T' key shortcut
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement)?.isContentEditable
      ) {
        return;
      }

      if (e.metaKey || e.ctrlKey || e.altKey) {
        return;
      }

      if (e.key.toLowerCase() === "t") {
        e.preventDefault();
        handleCycle();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleCycle]);

  const handleSelect = (themeId: AccentTheme) => {
    setActiveTheme(themeId);
    applyAccentTheme(themeId);
    playSound();
  };

  return (
    <>
      <div
        id="accent-theme-rail"
        aria-label="Color Theme Switcher"
        className="hidden xl:flex fixed xl:left-14 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-2.5 select-none"
      >
        <Kbd className="h-5 w-5 rounded-md text-[11px] font-mono font-semibold uppercase">
          T
        </Kbd>

        <div className="w-3.5 h-px bg-border/60 my-0.5" />

        {ACCENT_THEMES.map((theme) => {
          const isActive = activeTheme === theme.id;
          return (
            <Tooltip key={theme.id} delayDuration={100}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => handleSelect(theme.id)}
                  type="button"
                  data-accent-btn={theme.id}
                  suppressHydrationWarning
                  aria-label={`Select ${theme.label} theme`}
                  className={cn(
                    "relative group flex items-center justify-center p-1 rounded-full cursor-pointer transition-all duration-200 outline-none",
                    isActive ? "opacity-100" : "opacity-60 hover:opacity-100"
                  )}
                >
                  <span
                    data-accent-dot={theme.id}
                    suppressHydrationWarning
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
      {!mounted && (
        <script
          dangerouslySetInnerHTML={{
            __html: `(${(() => {
              try {
                const saved = localStorage.getItem('accent_theme');
                if (saved && saved !== 'zinc') {
                  const rail = document.getElementById('accent-theme-rail');
                  if (rail) {
                    const defaultBtn = rail.querySelector('[data-accent-btn="zinc"]');
                    const targetBtn = rail.querySelector('[data-accent-btn="' + saved + '"]');
                    const defaultDot = rail.querySelector('[data-accent-dot="zinc"]');
                    const targetDot = rail.querySelector('[data-accent-dot="' + saved + '"]');
                    if (defaultBtn) { defaultBtn.classList.remove('opacity-100'); defaultBtn.classList.add('opacity-60'); }
                    if (targetBtn) { targetBtn.classList.remove('opacity-60'); targetBtn.classList.add('opacity-100'); }
                    const ringMap: Record<string, string> = {
                      orange: 'ring-orange-500',
                      sky: 'ring-sky-500',
                      rose: 'ring-rose-500',
                      teal: 'ring-teal-500'
                    };
                    if (defaultDot) defaultDot.className = defaultDot.className.replace(/ring-2 ring-offset-2 ring-offset-background ring-\\S+/g, '');
                    if (targetDot && ringMap[saved]) {
                      targetDot.className += ' ring-2 ring-offset-2 ring-offset-background ' + ringMap[saved];
                    }
                  }
                }
              } catch (e) {}
            }).toString()})()`,
          }}
        />
      )}
    </>
  );
}

export function AccentThemeSelectorInline({ className }: { className?: string }) {
  const [activeTheme, setActiveTheme] = React.useState<AccentTheme>(() => getStoredAccentTheme());

  const playSound = React.useCallback(() => {
    if (typeof window === "undefined") return;
    const audio = new Audio(clickSoftSound.dataUri);
    void audio.play().catch(() => {});
  }, []);

  React.useEffect(() => {
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
    playSound();
  };

  return (
    <div className={cn("flex items-center gap-2 select-none", className)}>
      <Kbd className="h-4 w-4 rounded-sm text-[10px] font-mono font-semibold uppercase">
        T
      </Kbd>
      <div className="h-3 w-px bg-border/60 shrink-0" />
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

import { Palette } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

export function AccentThemePopover({ className }: { className?: string }) {
  const [activeTheme, setActiveTheme] = React.useState<AccentTheme>(() => getStoredAccentTheme());
  const [open, setOpen] = React.useState(false);

  const playSound = React.useCallback(() => {
    if (typeof window === "undefined") return;
    const audio = new Audio(clickSoftSound.dataUri);
    void audio.play().catch(() => {});
  }, []);

  React.useEffect(() => {
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
    playSound();
    setOpen(false);
  };

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
          <Kbd className="h-5 w-5 rounded-md text-[11px] font-mono font-semibold uppercase">
            T
          </Kbd>
          <div className="h-3.5 w-px bg-border/60 shrink-0" />
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
