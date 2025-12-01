"use client";

import { useEffect, useState, useRef } from "react";
import { StatCardProps } from "@/types";

export default function StatsCard({
  label,
  count,
  icon,
  colorClass,
}: StatCardProps) {
  const [displayCount, setDisplayCount] = useState(0);
  const prevCountRef = useRef(count);

  useEffect(() => {
    // Animate counter when count changes
    const prevCount = prevCountRef.current;
    prevCountRef.current = count;

    if (prevCount === count) {
      setDisplayCount(count);
      return;
    }

    const duration = 300; // ms
    const steps = 20;
    const increment = (count - prevCount) / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setDisplayCount(count);
        clearInterval(timer);
      } else {
        setDisplayCount(Math.round(prevCount + increment * currentStep));
      }
    }, duration / steps);

    return () => clearInterval(timer);
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
        <div className={`p-3 rounded-lg ${colorClass} bg-opacity-10`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
