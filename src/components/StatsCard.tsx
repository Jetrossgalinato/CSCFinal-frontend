"use client";

import { useEffect, useState } from "react";
import { StatCardProps } from "@/types";

export default function StatsCard({ label, count, colorClass }: StatCardProps) {
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrameId: number;
    const startCount = displayCount;
    const endCount = count;
    const duration = 2000; // 2 seconds for a smooth rolling effect

    if (startCount === endCount) return;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Ease out exponential
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      const current = Math.round(startCount + (endCount - startCount) * ease);
      setDisplayCount(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800 transition-all hover:shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {label}
          </p>
          <p
            className={`text-4xl font-bold ${colorClass} transition-all duration-300`}
          >
            {displayCount}
          </p>
        </div>
      </div>
    </div>
  );
}
