export interface DetectionStats {
  soldier: number;
  civilian: number;
  total: number;
}

export interface StatCardProps {
  label: string;
  count: number;
  icon: React.ReactNode;
  colorClass: string;
  theme: "light" | "dark";
}

export interface VideoFeedProps {
  apiUrl: string;
  theme: "light" | "dark";
}

export interface DetectionEvent {
  id: string;
  type: "soldier" | "civilian";
  timestamp: Date;
  count: number;
}
