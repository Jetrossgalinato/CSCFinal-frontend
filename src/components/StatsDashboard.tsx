"use client";

import StatsCard from "./StatsCard";
import DetectionLegend from "./DetectionLegend";
import { DetectionStats } from "@/types";

interface StatsDashboardProps {
  stats: DetectionStats;
  theme: "light" | "dark";
}

export default function StatsDashboard({ stats, theme }: StatsDashboardProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <StatsCard
          label="Soldiers Detected"
          count={stats.soldier}
          colorClass="text-red-500"
          theme={theme}
        />
        <StatsCard
          label="Civilians Detected"
          count={stats.civilian}
          colorClass="text-green-500"
          theme={theme}
        />
        <StatsCard
          label="Total Detected"
          count={stats.total}
          colorClass="text-blue-500"
          theme={theme}
        />
      </div>

      <DetectionLegend />
    </div>
  );
}
