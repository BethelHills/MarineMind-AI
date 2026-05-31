import { useEffect, useState, type ReactNode } from "react";
import AppLayout from "@/components/AppLayout";
import { MarineMindLandingPage } from "@/routes/index";

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
  return window.location.pathname;
}

export default function App() {
  const [activePath, setActivePath] = useState(getInitialPath);

  useEffect(() => {
    function onPopState() {
      setActivePath(window.location.pathname);
    }

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  function handleNavigate(path: string) {
    window.history.pushState({}, "", path);
    setActivePath(path);
  }

  if (activePath === "/") {
    return <MarineMindLandingPage onNavigate={handleNavigate} />;
  }

  const pages: Record<string, ReactNode> = {
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
