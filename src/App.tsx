import { useEffect, useState, type ReactNode } from "react";
import AppLayout from "@/components/AppLayout";

import Dashboard from "@/pages/Dashboard";
import Equipment from "@/pages/Equipment";
import Maintenance from "@/pages/Maintenance";
import AIAssistant from "@/pages/AIAssistant";
import Alerts from "@/pages/Alerts";
import Reports from "@/pages/Reports";
import Documents from "@/pages/Documents";
import Settings from "@/pages/Settings";

function getInitialPath() {
  if (typeof window === "undefined") return "/";
  const path = window.location.pathname;
  return path === "/dashboard" ? "/" : path;
}

export default function App() {
  const [activePath, setActivePath] = useState(getInitialPath);

  useEffect(() => {
    function onPopState() {
      const path = window.location.pathname;
      setActivePath(path === "/dashboard" ? "/" : path);
    }

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  function handleNavigate(path: string) {
    const nextPath = path === "/dashboard" ? "/" : path;
    window.history.pushState({}, "", nextPath);
    setActivePath(nextPath);
  }

  const pages: Record<string, ReactNode> = {
    "/": <Dashboard />,
    "/dashboard": <Dashboard />,
    "/equipment": <Equipment />,
    "/maintenance": <Maintenance />,
    "/ai-assistant": <AIAssistant />,
    "/alerts": <Alerts />,
    "/reports": <Reports />,
    "/documents": <Documents />,
    "/settings": <Settings />,
  };

  return (
    <AppLayout activePath={activePath} onNavigate={handleNavigate}>
      {pages[activePath] || <Dashboard />}
    </AppLayout>
  );
}
