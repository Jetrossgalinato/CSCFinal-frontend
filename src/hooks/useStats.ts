"use client";

import { useState, useEffect } from "react";
import { DetectionStats } from "@/types";
import { fetchStats } from "@/lib/api";

const REFRESH_INTERVAL = parseInt(
  process.env.NEXT_PUBLIC_STATS_REFRESH_INTERVAL || "500",
  10
);

export const useStats = () => {
  const [stats, setStats] = useState<DetectionStats>({
    soldier: 0,
    civilian: 0,
    total: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const updateStats = async () => {
      try {
        const data = await fetchStats();
        if (isMounted) {
          setStats(data);
          setError(null);
          setIsConnected(true);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : "Failed to fetch stats"
          );
          setIsConnected(false);
          setIsLoading(false);
        }
      }
    };

    // Initial fetch
    updateStats();

    // Set up polling
    const intervalId = setInterval(updateStats, REFRESH_INTERVAL);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  return { stats, isLoading, error, isConnected };
};
