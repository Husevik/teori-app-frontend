import type { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
          🏠 Hjem
        </button>

        <button
          className={`nav-pill ${active("/levels") ? "active" : ""}`}
          onClick={() => go("/levels")}
          type="button"
        >
          🎮 Nivåer
        </button>

        <button
          className={`nav-pill ${active("/quiz") ? "active" : ""}`}
          onClick={() => go("/quiz")}
          type="button"
        >
          🧠 Quiz
        </button>

        <button
          className="nav-pill logout"
          onClick={() => {
            localStorage.removeItem("token");
            if (onLogout) onLogout();
          }}
          type="button"
        >
          🚪 Logg ut
        </button>
      </nav>
    </div>
  );
}
