import { createContext, useContext, useEffect, useState } from "react";

// ── Accent presets ─────────────────────────────────────────────
export const ACCENTS = {
  yellow: { hsl: "72 100% 72%",  label: "Yellow",  emoji: "🟡" },
  pink:   { hsl: "340 100% 72%", label: "Pink",    emoji: "🩷" },
  cyan:   { hsl: "192 100% 62%", label: "Cyan",    emoji: "🩵" },
  purple: { hsl: "270 85% 75%",  label: "Purple",  emoji: "🟣" },
  orange: { hsl: "28 100% 63%",  label: "Orange",  emoji: "🟠" },
} as const;

export type AccentKey = keyof typeof ACCENTS;

// ── Context ────────────────────────────────────────────────────
interface ThemeCtx {
  dark: boolean;
  toggleDark: () => void;
  accent: AccentKey;
  setAccent: (k: AccentKey) => void;
}

const ThemeContext = createContext<ThemeCtx>({
  dark: false,
  toggleDark: () => {},
  accent: "yellow",
  setAccent: () => {},
});

export const useTheme = () => useContext(ThemeContext);

// ── Provider ───────────────────────────────────────────────────
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [dark, setDark] = useState<boolean>(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const [accent, setAccentState] = useState<AccentKey>(() => {
    const saved = localStorage.getItem("accent");
    return (saved as AccentKey) ?? "yellow";
  });

  // Apply dark class + persist
  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  // Apply accent CSS var + persist
  useEffect(() => {
    const hsl = ACCENTS[accent].hsl;
    document.documentElement.style.setProperty("--primary", hsl);
    document.documentElement.style.setProperty("--sidebar-primary", hsl);
    localStorage.setItem("accent", accent);
  }, [accent]);

  const toggleDark = () => setDark((d) => !d);
  const setAccent = (k: AccentKey) => setAccentState(k);

  return (
    <ThemeContext.Provider value={{ dark, toggleDark, accent, setAccent }}>
      {children}
    </ThemeContext.Provider>
  );
};
