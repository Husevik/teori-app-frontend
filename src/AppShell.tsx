import type { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLanguage } from "./locales/LanguageContext";

type Props = {
  children: ReactNode;
  user: {
    email: string;
  };
  isAdmin?: boolean;
  onLogout?: () => void;
};

export default function AppShell({
  children,
  user,
  isAdmin,
  onLogout,
}: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, language, setLanguage } = useLanguage();

  function go(path: string) {
    navigate(path);
  }

  function active(path: string) {
    return location.pathname === path;
  }

  return (
    <div className="app-bg">
      {/* HEADER */}
      <header className="top-bar blue-gradient">
        <div className="brand">TrafikkLæring</div>
        <div className="user">
          {user.email}
          {isAdmin && <span className="admin-badge">ADMIN</span>}
        </div>
      </header>

      {/* MAIN */}
      <main className="content">
        {children}
      </main>

      {/* FLOATING NAV */}
      <nav className="floating-nav">
        <button
          className={`nav-pill ${active("/") ? "active" : ""}`}
          onClick={() => go("/")}
          type="button"
        >
          🏠 {language === "no" ? "Hjem" : "Home"}
        </button>

        <button
          className={`nav-pill ${active("/levels") ? "active" : ""}`}
          onClick={() => go("/levels")}
          type="button"
        >
          🎮 {language === "no" ? "Nivåer" : "Levels"}
        </button>

        <button
          className={`nav-pill ${active("/quiz") ? "active" : ""}`}
          onClick={() => go("/quiz")}
          type="button"
        >
          🧠 {language === "no" ? "Quiz" : "Quiz"}
        </button>

        <button
          className="nav-pill logout"
          onClick={() => {
            localStorage.removeItem("token");
            if (onLogout) onLogout();
          }}
          type="button"
        >
          🚪 {language === "no" ? "Logg ut" : "Logout"}
        </button>
      </nav>
    </div>
  );
}
