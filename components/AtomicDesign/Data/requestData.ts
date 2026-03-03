// requestData.ts
import { MessageCircle, Hospital, ShoppingBag, Phone } from "lucide-react";

export const requestTypes = [
  {
    label: "I would like someone to talk to",
    value: "talk",
    icon: MessageCircle,
  },
  {
    label: "I need help going to a hospital",
    value: "hospital",
    icon: Hospital,
  },
  {
    label: "I need help with groceries",
    value: "groceries",
    icon: ShoppingBag,
  },
  { label: "Can someone check in on me?", value: "checkin", icon: Phone },
];

export const priorityLevels = [
  { value: "low", label: "Low - Can wait a few days" },
  { value: "medium", label: "Medium - Needed within 1-2 days" },
  { value: "high", label: "High - Needed today or tomorrow" },
  { value: "urgent", label: "Urgent - Needed immediately" },
];

export const preferredTimes = [
  { value: "morning", label: "Morning" },
  { value: "afternoon", label: "Afternoon" },
  { value: "evening", label: "Evening" },
];
