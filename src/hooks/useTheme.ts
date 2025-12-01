"use client";

import { useState, useCallback, useLayoutEffect, useRef } from "react";

export type Theme = "light" | "dark";

const getInitialTheme = (): Theme => {
  if (typeof window === "undefined") return "light";
  const savedTheme = localStorage.getItem("theme") as Theme | null;
  if (savedTheme) return savedTheme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [mounted, setMounted] = useState(false);
  const mountedRef = useRef(false);

  const applyTheme = useCallback((newTheme: Theme) => {
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      if (newTheme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  }, []);

  // Apply theme synchronously before paint
  useLayoutEffect(() => {
    applyTheme(theme);

    // Set mounted only once, after first render
    if (!mountedRef.current) {
      mountedRef.current = true;
      // Use a microtask to avoid setState during render warning
      Promise.resolve().then(() => setMounted(true));
    }
  }, [applyTheme, theme]);

  const toggleTheme = useCallback(() => {
    setTheme((currentTheme) => {
      const newTheme: Theme = currentTheme === "light" ? "dark" : "light";
      applyTheme(newTheme);
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  }, [applyTheme]);

  return { theme, toggleTheme, mounted };
};
