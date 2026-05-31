import { AnimatePresence, motion } from "framer-motion";
import { BellRing, CheckCheck, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { spring } from "@/lib/motion";
import {
  initialNotifications,
  notificationLevelStyle,
  type NotificationItem,
} from "@/lib/notifications-data";
import { cn } from "@/lib/utils";

type NotificationBellProps = {
  onNavigate?: (path: string) => void;
};

export function NotificationBell({ onNavigate }: NotificationBellProps) {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [ringing, setRinging] = useState(false);
  const prevUnread = useRef(0);

  const unreadCount = useMemo(
    () => notifications.filter((item) => !item.read).length,
    [notifications],
  );

  useEffect(() => {
    if (unreadCount > prevUnread.current) {
      setRinging(true);
      const timer = window.setTimeout(() => setRinging(false), 900);
      prevUnread.current = unreadCount;
      return () => window.clearTimeout(timer);
    }
    prevUnread.current = unreadCount;
  }, [unreadCount]);

  function markRead(id: string) {
    setNotifications((current) =>
      current.map((item) => (item.id === id ? { ...item, read: true } : item)),
    );
  }

  function dismiss(id: string) {
    setNotifications((current) => current.filter((item) => item.id !== id));
  }

  function markAllRead() {
    setNotifications((current) => current.map((item) => ({ ...item, read: true })));
  }

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (next && unreadCount > 0) {
      setRinging(true);
      window.setTimeout(() => setRinging(false), 700);
    }
  }

  function handleNotificationClick(item: NotificationItem) {
    markRead(item.id);
    setOpen(false);
    onNavigate?.("/alerts");
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <motion.button
          type="button"
          aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ""}`}
          className="relative rounded-2xl border bg-white p-3 text-slate-700 transition hover:border-cyan-300 hover:text-cyan-700"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={spring}
        >
          <motion.span
            animate={
              ringing
                ? { rotate: [0, 18, -16, 12, -10, 6, 0], scale: [1, 1.08, 1] }
                : { rotate: 0, scale: 1 }
            }
            transition={{ duration: 0.55, ease: "easeInOut" }}
            className="grid place-items-center"
          >
            <BellRing className="h-5 w-5" />
          </motion.span>

          <AnimatePresence>
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={spring}
                className="absolute -right-1 -top-1 grid min-h-5 min-w-5 place-items-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white shadow-lg shadow-red-500/30"
              >
                {unreadCount > 9 ? "9+" : unreadCount}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={10}
        className="w-[min(100vw-2rem,22rem)] rounded-3xl border-slate-200 bg-white p-0 shadow-xl"
      >
        <div className="border-b border-slate-100 px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-black text-slate-950">Notifications</p>
              <p className="text-xs text-slate-500">
                {unreadCount > 0 ? `${unreadCount} unread alert${unreadCount === 1 ? "" : "s"}` : "All caught up"}
              </p>
            </div>
            {unreadCount > 0 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={markAllRead}
                className="h-8 rounded-xl text-xs text-cyan-700 hover:bg-cyan-50 hover:text-cyan-800"
              >
                <CheckCheck className="mr-1 h-3.5 w-3.5" />
                Mark all read
              </Button>
            )}
          </div>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          <AnimatePresence initial={false} mode="popLayout">
            {notifications.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="grid min-h-36 place-items-center px-4 text-center"
              >
                <div>
                  <BellRing className="mx-auto mb-3 h-8 w-8 text-slate-300" />
                  <p className="font-semibold text-slate-700">No notifications</p>
                  <p className="mt-1 text-sm text-slate-500">You're all clear for now.</p>
                </div>
              </motion.div>
            ) : (
              notifications.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 24, height: 0, marginBottom: 0 }}
                  transition={spring}
                  className={cn(
                    "group mb-2 rounded-2xl border p-3 transition last:mb-0",
                    item.read ? "border-slate-100 bg-slate-50/80" : "border-cyan-100 bg-cyan-50/50",
                  )}
                >
                  <div className="flex items-start gap-3">
                    <button
                      type="button"
                      onClick={() => handleNotificationClick(item)}
                      className="min-w-0 flex-1 text-left"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={cn(
                            "rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                            notificationLevelStyle(item.level),
                          )}
                        >
                          {item.level}
                        </span>
                        {!item.read && (
                          <span className="h-2 w-2 rounded-full bg-cyan-500" aria-hidden />
                        )}
                      </div>
                      <p className="mt-2 text-sm font-semibold leading-5 text-slate-900">{item.title}</p>
                      <p className="mt-1 text-xs text-slate-500">{item.time}</p>
                    </button>

                    <button
                      type="button"
                      aria-label="Dismiss notification"
                      onClick={() => dismiss(item.id)}
                      className="rounded-lg p-1 text-slate-400 opacity-0 transition hover:bg-white hover:text-slate-700 group-hover:opacity-100"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        <div className="border-t border-slate-100 p-3">
          <Button
            type="button"
            variant="outline"
            className="h-10 w-full rounded-2xl"
            onClick={() => {
              setOpen(false);
              onNavigate?.("/alerts");
            }}
          >
            View all alerts
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
