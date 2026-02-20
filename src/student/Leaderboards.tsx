import { useNavigate } from "react-router-dom";
import "./Leaderboards.css";
import { useLanguage } from "../locales/LanguageContext";

const MOCK_LEADERBOARD = [
  { name: "Alice", score: 1200 },
  { name: "Bob", score: 1100 },
  { name: "Charlie", score: 950 },
  { name: "Diana", score: 900 },
  { name: "Eve", score: 850 },
];

export default function Leaderboards() {
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  return (
    <div className="student-page">
      <div className="student-container">
        <div className="card student-leaderboards-container" style={{ position: "relative", paddingBottom: "72px" }}>
          <h2>{t("Leaderboards")}</h2>
          <table className="student-leaderboard-table">
            <thead>
              <tr>
                <th>{t("Name")}</th>
                <th>{t("Score")}</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_LEADERBOARD.map(({ name, score }, i) => (
                <tr key={i}>
                  <td>{name}</td>
                  <td>{score}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ position: "absolute", bottom: 20, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
            <button
              className="student-primary-button"
              type="button"
              onClick={() => navigate("/")}
            >
              {t("Back to Menu")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
