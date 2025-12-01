"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

interface HeaderProps {
  theme: "light" | "dark";
  onToggleTheme: () => void;
  isConnected: boolean;
}

export default function Header({
  theme,
  onToggleTheme,
  isConnected,
}: HeaderProps) {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            🛸 Drone Surveillance System
          </h1>
          <div className="flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full ${
                isConnected ? "bg-green-500 animate-pulse" : "bg-red-500"
              }`}
            />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {isConnected ? "Live" : "Offline"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-sm font-mono text-gray-600 dark:text-gray-400">
            {currentTime}
          </div>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </div>
    </header>
  );
}
