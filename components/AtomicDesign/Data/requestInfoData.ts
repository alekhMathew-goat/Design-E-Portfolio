// requestInfoData.ts
import { AlertCircle, Clock } from "lucide-react";

export const PRIORITY_INFO: Record<
  string,
  { bg: string; text: string; description: string }
> = {
  urgent: {
    bg: "bg-red-100",
    text: "text-red-700",
    description: "Urgent - Needed immediately",
  },
  high: {
    bg: "bg-orange-100",
    text: "text-orange-700",
    description: "High - Needed today or tomorrow",
  },
  medium: {
    bg: "bg-yellow-100",
    text: "text-yellow-700",
    description: "Medium - Needed within 1-2 days",
  },
  low: {
    bg: "bg-green-100",
    text: "text-green-700",
    description: "Low - Can wait a few days",
  },
};

export const SAFETY_REMINDER = {
  icon: AlertCircle,
  title: "Safety reminder",
  description:
    "Only accept tasks you can safely complete. If urgent medical help is needed, contact emergency services.",
};

export const TIME_ICON = Clock;
