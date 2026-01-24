import type { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  children: ReactNode;
  user: {
    email: string;
  };
  isAdmin: boolean;
};

export default function AppShell({ children, user, isAdmin }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  function isActive(path: string) {
    return location.pathname === path;
  }

  return (
    <div className="app-bg">
      {/* ---------- HEADER ---------- */}
      <header className="top-bar">
        <div className="brand">TrafikkLæring</div>

        <div className="user">
          {user.email}
          {isAdmin && <span className="admin-badge">ADMIN</span>}
        </div>
      </header>

      {/* ---------- MAIN CONTENT ---------- */}
      <main className="content">{children}</main>

      {/* ---------- BOTTOM NAV ---------- */}
      <nav className="bottom-nav">
        <button
          className={`nav-item ${isActive("/") ? "active" : ""}`}
          onClick={() => navigate("/")}
        >
          Hjem
        </button>

        {isAdmin && (
          <button
            className={`nav-item ${isActive("/admin") ? "active" : ""}`}
            onClick={() => navigate("/admin")}
          >
            Admin
          </button>
        )}

        <button
          className="nav-item"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.reload();
          }}
        >
          Logg ut
        </button>
      </nav>
    </div>
  );
}
