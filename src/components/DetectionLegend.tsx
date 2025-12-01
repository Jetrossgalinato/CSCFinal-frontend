"use client";

export default function DetectionLegend() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Detection Legend
      </h3>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-4 border-green-500 rounded" />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Green Box = Civilian
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-4 border-red-500 rounded" />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Red Box = Soldier
          </span>
        </div>
      </div>
    </div>
  );
}
