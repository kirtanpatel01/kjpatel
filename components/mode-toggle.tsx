"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    playSound();
  }

  const playSound = () => {
    const audio = new Audio("/sounds/computer-mouse-click.mp3");
    audio.play();
  }

  return (
    <button
      onClick={toggleTheme}
      className="
        relative flex items-center justify-center cursor-pointer
        h-10 w-10 text-slate-800 dark:text-slate-300 rounded-full
        transition-colors duration-300 inset-shadow-xs inset-shadow-slate-500/40 dark:inset-shadow-slate-600 
      "
    >
      <AnimatePresence initial={false} mode="wait">
        {theme === "dark" ? (
          <motion.span
            key="moon"
            initial={{ rotate: -90, opacity: 0, scale: 0 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0 }}
            transition={{ duration: 0.20, ease: "easeInOut" }}
            className="absolute"
          >
            <Moon className="h-5 w-5" />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ rotate: 90, opacity: 0, scale: 0 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0 }}
            transition={{ duration: 0.20, ease: "easeInOut" }}
            className="absolute"
          >
            <Sun className="h-5 w-5" />
          </motion.span>
        )}
      </AnimatePresence>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
