export type NotificationItem = {
  id: string;
  title: string;
  level: "Critical" | "Warning" | "Info";
  time: string;
  read: boolean;
};

export const initialNotifications: NotificationItem[] = [
  {
    id: "NT-1001",
    title: "Cooling Pump vibration above normal",
    level: "Critical",
    time: "12 mins ago",
    read: false,
  },
  {
    id: "NT-1002",
    title: "Main Engine inspection due soon",
    level: "Warning",
    time: "1 hour ago",
    read: false,
  },
  {
    id: "NT-1003",
    title: "Fuel Purifier maintenance due",
    level: "Warning",
    time: "3 hours ago",
    read: false,
  },
  {
    id: "NT-1004",
    title: "Generator health score improved",
    level: "Info",
    time: "Yesterday",
    read: true,
  },
];

export function notificationLevelStyle(level: NotificationItem["level"]) {
  if (level === "Critical") return "bg-red-500/15 text-red-700 border-red-200";
  if (level === "Warning") return "bg-amber-500/15 text-amber-700 border-amber-200";
  return "bg-cyan-500/15 text-cyan-700 border-cyan-200";
}
