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

  function logout() {
    localStorage.removeItem("token");
    window.location.reload();
  }

  return (
    <div className="app-bg">
      {/* HEADER */}
      <header className="top-bar">
        <div className="brand">TrafikkLæring</div>

        <div className="user">
          {user.email}
          {isAdmin && <span className="admin-badge">ADMIN</span>}
        </div>
      </header>

      {/* CONTENT */}
      <main className="content">{children}</main>

      {/* NAV */}
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

        <button className="nav-item" onClick={logout}>
          Logg ut
        </button>
      </nav>
    </div>
  );
}
