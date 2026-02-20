import { useNavigate } from "react-router-dom";
import "./MainMenu.css";

export default function MainMenu() {
  const navigate = useNavigate();

  const buttons = [
    { emoji: "🎮", label: "Play", route: "/play" },
    { emoji: "📝", label: "Practice", route: "/practice" },
    { emoji: "👤", label: "Profile", route: "/profile" },
    { emoji: "🏆", label: "Leaderboards", route: "/leaderboards" },
  ];

  return (
    <div className="student-page">
      <div className="student-container">
        {/* Removed card wrapper to remove dark blue background panel */}
        <div className="student-main-menu">
          {buttons.map(({ emoji, label, route }) => (
            <button
              key={route}
              className="student-menu-card"
              onClick={() => navigate(route)}
              type="button"
              aria-label={label}
            >
              <div className="menu-icon" aria-hidden="true">
                {emoji}
              </div>
              <h3>{label}</h3>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
