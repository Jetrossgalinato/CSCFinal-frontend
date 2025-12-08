"use client";

import { useState, useEffect } from "react";
import { getVideoFeedUrl } from "@/lib/api";
import { Maximize, RefreshCw, AlertCircle, Users, Shield } from "lucide-react";

interface DualVideoFeedProps {
  theme: "light" | "dark";
}

interface VideoState {
  isLoading: boolean;
  hasError: boolean;
  key: number;
}

export default function DualVideoFeed({ theme }: DualVideoFeedProps) {
  const [civilianState, setCivilianState] = useState<VideoState>({
    isLoading: true,
    hasError: false,
    key: 0,
  });

  const [soldierState, setSoldierState] = useState<VideoState>({
    isLoading: true,
    hasError: false,
    key: 0,
  });

  const [isFullscreen, setIsFullscreen] = useState(false);

  const civilianUrl = getVideoFeedUrl("civilian");
  const soldierUrl = getVideoFeedUrl("soldier");

  const handleImageLoad = (type: "civilian" | "soldier") => {
    if (type === "civilian") {
      setCivilianState((prev) => ({
        ...prev,
        isLoading: false,
        hasError: false,
      }));
    } else {
      setSoldierState((prev) => ({
        ...prev,
        isLoading: false,
        hasError: false,
      }));
    }
  };

  const handleImageError = (type: "civilian" | "soldier") => {
    if (type === "civilian") {
      setCivilianState((prev) => ({
        ...prev,
        isLoading: false,
        hasError: true,
      }));
    } else {
      setSoldierState((prev) => ({
        ...prev,
        isLoading: false,
        hasError: true,
      }));
    }
  };

  const handleRetry = (type: "civilian" | "soldier") => {
    if (type === "civilian") {
      setCivilianState((prev) => ({
        isLoading: true,
        hasError: false,
        key: prev.key + 1,
      }));
    } else {
      setSoldierState((prev) => ({
        isLoading: true,
        hasError: false,
        key: prev.key + 1,
      }));
    }
  };

  const handleRetryAll = () => {
    setCivilianState((prev) => ({
      isLoading: true,
      hasError: false,
      key: prev.key + 1,
    }));
    setSoldierState((prev) => ({
      isLoading: true,
      hasError: false,
      key: prev.key + 1,
    }));
  };

  const toggleFullscreen = () => {
    const elem = document.documentElement;

    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const renderVideoPanel = (
    type: "civilian" | "soldier",
    state: VideoState,
    url: string,
    title: string,
    icon: React.ReactNode,
    accentColor: string
  ) => (
    <div className="relative flex flex-col h-full">
      {/* Header */}
      <div
        className={`p-3 flex items-center justify-between flex-shrink-0 border-b ${
          type === "civilian"
            ? "bg-gradient-to-r from-green-500/10 to-transparent border-green-500/30"
            : "bg-gradient-to-r from-red-500/10 to-transparent border-red-500/30"
        }`}
      >
        <div className="flex items-center gap-2">
          <div
            className={`p-1.5 rounded-lg ${
              type === "civilian"
                ? "bg-green-500/20 text-green-600 dark:text-green-400"
                : "bg-red-500/20 text-red-600 dark:text-red-400"
            }`}
          >
            {icon}
          </div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          <div
            className={`ml-2 w-2 h-2 rounded-full ${
              !state.hasError && !state.isLoading
                ? "bg-green-500 animate-pulse"
                : "bg-gray-400"
            }`}
          />
        </div>
        <button
          onClick={() => handleRetry(type)}
          className={`p-1.5 rounded-lg transition-colors ${
            type === "civilian"
              ? "bg-green-500/10 hover:bg-green-500/20 text-green-600 dark:text-green-400"
              : "bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400"
          }`}
          aria-label={`Refresh ${type} feed`}
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Video Content */}
      <div className="relative flex-1 min-h-0 bg-gray-900">
        {state.isLoading && !state.hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <div className="flex flex-col items-center gap-2">
              <div
                className={`w-10 h-10 border-3 border-t-transparent rounded-full animate-spin ${
                  type === "civilian" ? "border-green-500" : "border-red-500"
                }`}
              />
              <p className="text-xs text-gray-400">Loading {type} feed...</p>
            </div>
          </div>
        )}

        {state.hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <div className="flex flex-col items-center gap-2 text-center px-4">
              <AlertCircle
                className={`w-10 h-10 ${
                  type === "civilian" ? "text-green-500" : "text-red-500"
                }`}
              />
              <p className="text-xs font-medium text-white">
                Failed to load {type} feed
              </p>
              <button
                onClick={() => handleRetry(type)}
                className={`mt-1 px-3 py-1.5 text-xs rounded-lg text-white transition-colors ${
                  type === "civilian"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={state.key}
          src={url}
          alt={`${title} Feed`}
          className={`absolute inset-0 w-full h-full object-contain ${
            state.isLoading || state.hasError ? "invisible" : "visible"
          }`}
          onLoad={() => handleImageLoad(type)}
          onError={() => handleImageError(type)}
        />
      </div>
    </div>
  );

  return (
    <div
      className={`relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden flex flex-col h-full ${
        isFullscreen ? "fixed inset-0 z-50 rounded-none" : ""
      }`}
    >
      {/* Main Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between flex-shrink-0 bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-800/50">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10">
            <svg
              className="w-5 h-5 text-blue-600 dark:text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Dual Drone Surveillance
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Real-time YOLOv8 Detection System
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleRetryAll}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Refresh all feeds"
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

      {/* Split Screen Content */}
      <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 gap-0.5 bg-gray-800">
        {/* Civilian Feed */}
        {renderVideoPanel(
          "civilian",
          civilianState,
          civilianUrl,
          "Civilian Detection",
          <Users className="w-4 h-4" />,
          "green"
        )}

        {/* Soldier Feed */}
        {renderVideoPanel(
          "soldier",
          soldierState,
          soldierUrl,
          "Soldier Detection",
          <Shield className="w-4 h-4" />,
          "red"
        )}
      </div>

      {/* Fullscreen Exit Button */}
      {isFullscreen && (
        <button
          onClick={toggleFullscreen}
          className="absolute top-4 right-4 px-4 py-2 bg-gray-900 bg-opacity-90 text-white rounded-lg hover:bg-opacity-100 transition-all backdrop-blur-sm z-10"
        >
          Exit Fullscreen
        </button>
      )}
    </div>
  );
}
