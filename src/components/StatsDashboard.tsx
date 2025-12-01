"use client";

import { Users, Shield, Target } from "lucide-react";
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
          icon={<Shield className="w-8 h-8 text-red-500" />}
          colorClass="text-red-500"
          theme={theme}
        />
        <StatsCard
          label="Civilians Detected"
          count={stats.civilian}
          icon={<Users className="w-8 h-8 text-green-500" />}
          colorClass="text-green-500"
          theme={theme}
        />
        <StatsCard
          label="Total Detected"
          count={stats.total}
          icon={<Target className="w-8 h-8 text-blue-500" />}
          colorClass="text-blue-500"
          theme={theme}
        />
      </div>

      <DetectionLegend />
    </div>
  );
}
