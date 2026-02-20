import { useNavigate } from "react-router-dom";
import "./Play.css";

export default function Play() {
  const navigate = useNavigate();

  const levels = [
    { id: 1, label: "Level 1", enabled: true },
    { id: 2, label: "Level 2", enabled: false },
    { id: 3, label: "Level 3", enabled: false },
  ];

  return (
    <div className="student-page">
      <div className="student-container">
        <div className="card">
          <h2 className="play-header">Play Levels</h2>
          <div className="student-levels-grid">
            {levels.map(({ id, label, enabled }) => (
              <button
                key={id}
                className="student-level-card"
                onClick={() => enabled && navigate(`/level/${id}`)}
                disabled={!enabled}
                type="button"
                aria-disabled={!enabled}
                aria-label={enabled ? `Play ${label}` : `${label} locked`}
              >
                <h3>{label}</h3>
              </button>
            ))}
          </div>
          <div className="student-back-button-container">
            <button
              className="student-back-button"
              onClick={() => navigate("/")}
              type="button"
            >
              ⬅ Back to Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
