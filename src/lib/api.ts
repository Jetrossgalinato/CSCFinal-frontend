import { DetectionStats } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const fetchStats = async (): Promise<DetectionStats> => {
  try {
    const response = await fetch(`${API_URL}/stats`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as DetectionStats;
  } catch (error) {
    console.error("Failed to fetch stats:", error);
    throw error;
  }
};

export const getVideoFeedUrl = (feed: "civilian" | "soldier"): string => {
  return `${API_URL}/video_feed/${feed}`;
};

export const checkBackendHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      cache: "no-store",
    });
    return response.ok;
  } catch (error) {
    console.error("Backend health check failed:", error);
    return false;
  }
};

export const resetStats = async (): Promise<void> => {
  try {
    await fetch(`${API_URL}/reset_stats`, {
      method: "POST",
      cache: "no-store",
    });
  } catch (error) {
    console.error("Failed to reset stats:", error);
  }
};
