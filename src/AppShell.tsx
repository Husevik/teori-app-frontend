import type { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  children: ReactNode;
  user: {
    email: string;
    isAdmin?: boolean;
  };
  onLogout: () => void;
};

export default function AppShell({ children, user, onLogout }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  function active(path: string) {
    return location.pathname === path ? "active" : "";
  }

  return (
    <div className="app-bg">
      {/* HEADER */}
      <header className="top-bar">
        <div className="brand">Teori-app</div>
        <div className="user">
          {user.email}
          {user.isAdmin && <span className="admin-badge">ADMIN</span>}
        </div>
      </header>

      {/* CONTENT */}
      <main className="content">{children}</main>

      {/* NAV */}
      <nav className="bottom-nav">
        <button className={active("/")} onClick={() => navigate("/")}>
          Hjem
        </button>

        <button className={active("/quiz")} onClick={() => navigate("/quiz")}>
          Quiz
        </button>

        {user.isAdmin && (
          <button
            className={active("/admin")}
            onClick={() => navigate("/admin")}
          >
            Admin
          </button>
        )}

        <button
          onClick={() => {
            localStorage.removeItem("token");
            onLogout();
          }}
        >
          Logg ut
        </button>
      </nav>
    </div>
  );
}
