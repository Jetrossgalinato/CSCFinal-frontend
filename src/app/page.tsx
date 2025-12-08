"use client";

import { useEffect } from "react";
import { useStats } from "@/hooks/useStats";
import { useTheme } from "@/hooks/useTheme";
import { resetStats } from "@/lib/api";
import Header from "@/components/Header";
import DualVideoFeed from "@/components/DualVideoFeed";
import StatsDashboard from "@/components/StatsDashboard";
import { AlertCircle } from "lucide-react";

export default function Home() {
  const { stats, isLoading, error, isConnected } = useStats();
  const { theme, toggleTheme, mounted } = useTheme();

  useEffect(() => {
    resetStats();
  }, []);

  // Prevent flash of unstyled content
  if (!mounted) {
    return null;
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-black transition-colors duration-300 overflow-hidden">
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        isConnected={isConnected}
      />

      <main className="flex-1 w-full px-4 py-4 overflow-auto flex flex-col gap-4">
        {error && !isConnected && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-900 dark:text-red-200">
                Backend Connection Error
              </p>
              <p className="text-xs text-red-700 dark:text-red-300 mt-1">
                {
                  "Cannot connect to the FastAPI backend. Make sure it's running on http://localhost:8000"
                }
              </p>
            </div>
          </div>
        )}

        {/* Dual Video Feed - Full width */}
        <div className="flex-1 min-h-[500px]">
          <DualVideoFeed theme={theme} />
        </div>

        {/* Statistics Dashboard - Full width at bottom */}
        <div className="w-full">
          {isLoading && !isConnected ? (
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Loading statistics...
                </p>
              </div>
            </div>
          ) : (
            <StatsDashboard stats={stats} theme={theme} />
          )}
        </div>

        {/* Footer Info */}
        <div className="text-center pb-2">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Real-time YOLOv8 Detection System • Updates every 500ms
          </p>
        </div>
      </main>
    </div>
  );
}
