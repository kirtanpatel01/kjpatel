"use client";

import { AnimatePresence, motion } from "motion/react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

import { clickSoftSound } from "@/lib/click-soft";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  const playSound = React.useCallback(() => {
    if (typeof window === "undefined") return;

    const audio = new Audio(clickSoftSound.dataUri);
    void audio.play().catch(() => {});
  }, []);

  const toggleTheme = React.useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
    playSound();
  }, [theme, setTheme, playSound]);

  // Handle 'D' key shortcut
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't toggle if user is typing in an input, textarea, or contentEditable element
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement).isContentEditable
      ) {
        return;
      }

      if (e.key.toLowerCase() === "d") {
        toggleTheme();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleTheme]);

  React.useEffect(() => setMounted(true), []);

  return (
    <>
      <button
        id="mode-toggle-btn"
        onClick={toggleTheme}
        suppressHydrationWarning
        className="
          relative flex items-center justify-center cursor-pointer shrink-0
          text-muted-foreground hover:text-foreground transition-[color,transform] duration-150 active:scale-[0.96] p-1 h-8 w-8 after:absolute after:-inset-1.5 after:content-['']"
        aria-label="Toggle theme"
      >
        {mounted ? (
          <AnimatePresence initial={false} mode="wait">
            {theme === "dark" ? (
              <motion.span
                key="moon"
                initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
                transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                className="absolute flex items-center justify-center"
              >
                <Moon className="h-4 w-4" />
              </motion.span>
            ) : (
              <motion.span
                key="sun"
                initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
                transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                className="absolute flex items-center justify-center"
              >
                <Sun className="h-4 w-4" />
              </motion.span>
            )}
          </AnimatePresence>
        ) : (
          <>
            <span
              id="mode-toggle-sun"
              className="hidden"
              suppressHydrationWarning
            >
              <Sun className="h-4 w-4" />
            </span>
            <span
              id="mode-toggle-moon"
              className="hidden"
              suppressHydrationWarning
            >
              <Moon className="h-4 w-4" />
            </span>
          </>
        )}
        <span className="sr-only">Toggle theme</span>
      </button>
      {!mounted && (
        <script
          dangerouslySetInnerHTML={{
            __html: `(${(
              () => {
                try {
                  const isDark =
                    document.documentElement.classList.contains("dark") ||
                    localStorage.getItem("theme") === "dark" ||
                    (!("theme" in localStorage) &&
                      window.matchMedia("(prefers-color-scheme: dark)")
                        .matches);
                  const sun = document.getElementById("mode-toggle-sun");
                  const moon = document.getElementById("mode-toggle-moon");
                  if (isDark) {
                    if (moon) moon.style.display = "inline-flex";
                    if (sun) sun.style.display = "none";
                  } else {
                    if (sun) sun.style.display = "inline-flex";
                    if (moon) moon.style.display = "none";
                  }
                } catch (e) {}
              }
            ).toString()})()`,
          }}
        />
      )}
    </>
  );
}
