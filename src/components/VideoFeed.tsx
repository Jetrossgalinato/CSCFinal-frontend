"use client";

import { useState } from "react";
import { getVideoFeedUrl } from "@/lib/api";
import { Maximize, RefreshCw, AlertCircle } from "lucide-react";

interface VideoFeedProps {
  theme: "light" | "dark";
}

export default function VideoFeed({}: VideoFeedProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [key, setKey] = useState(0);

  const videoUrl = getVideoFeedUrl();

  const handleImageLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleRetry = () => {
    setIsLoading(true);
    setHasError(false);
    setKey((prev) => prev + 1);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden flex flex-col h-full">
      <div className="p-3 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between flex-shrink-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Live Video Feed
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handleRetry}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Refresh video feed"
          >
            <RefreshCw className="w-4 h-4 text-gray-700 dark:text-gray-300" />
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle fullscreen"
          >
            <Maximize className="w-4 h-4 text-gray-700 dark:text-gray-300" />
          </button>
        </div>
      </div>

      <div
        className={`relative flex-1 min-h-0 ${
          isFullscreen
            ? "fixed inset-0 z-50 bg-black"
            : "bg-gray-100 dark:bg-gray-800"
        }`}
      >
        {isLoading && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Loading video stream...
              </p>
            </div>
          </div>
        )}

        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3 text-center px-4">
              <AlertCircle className="w-12 h-12 text-red-500" />
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Failed to load video stream
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Make sure the backend is running on localhost:8000
              </p>
              <button
                onClick={handleRetry}
                className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                Retry Connection
              </button>
            </div>
          </div>
        )}

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={key}
          src={videoUrl}
          alt="Live Drone Feed"
          className={`w-full h-full object-cover ${
            isLoading || hasError ? "invisible" : "visible"
          }`}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />

        {isFullscreen && (
          <button
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 px-4 py-2 bg-gray-900 bg-opacity-75 text-white rounded-lg hover:bg-opacity-90 transition-all"
          >
            Exit Fullscreen
          </button>
        )}
      </div>
    </div>
  );
}
