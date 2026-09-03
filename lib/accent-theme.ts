export type AccentTheme = "zinc" | "orange" | "sky" | "rose" | "teal";

export const ACCENT_THEMES: {
  id: AccentTheme;
  label: string;
  dotColor: string;
  ringColor: string;
}[] = [
  {
    id: "zinc",
    label: "Mono",
    dotColor: "bg-zinc-800 dark:bg-zinc-200",
    ringColor: "ring-zinc-600 dark:ring-zinc-400",
  },
  {
    id: "orange",
    label: "Orange",
    dotColor: "bg-orange-500",
    ringColor: "ring-orange-500",
  },
  {
    id: "sky",
    label: "Sky",
    dotColor: "bg-sky-500",
    ringColor: "ring-sky-500",
  },
  {
    id: "rose",
    label: "Rose",
    dotColor: "bg-rose-500",
    ringColor: "ring-rose-500",
  },
  {
    id: "teal",
    label: "Teal",
    dotColor: "bg-teal-500",
    ringColor: "ring-teal-500",
  },
];

const STORAGE_KEY = "accent_theme";

export function getStoredAccentTheme(): AccentTheme {
  if (typeof window === "undefined") return "zinc";
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as AccentTheme;
    if (saved && ["zinc", "orange", "sky", "rose", "teal"].includes(saved)) {
      return saved;
    }
  } catch {
    // Ignore storage errors
  }
  return "zinc";
}

export function applyAccentTheme(theme: AccentTheme): void {
  if (typeof window === "undefined") return;
  if (theme === "zinc") {
    document.documentElement.removeAttribute("data-accent");
  } else {
    document.documentElement.setAttribute("data-accent", theme);
  }
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Ignore storage errors
  }
  window.dispatchEvent(
    new CustomEvent("accent-theme-change", { detail: theme })
  );
}
