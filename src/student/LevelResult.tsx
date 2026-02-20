import { useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../locales/LanguageContext";

export default function QuizResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  const state = location.state as
    | { score: number; total: number }
    | undefined;

  if (!state) {
    return (
      <div className="card">
        <h2>{language === "no" ? "Ingen resultatdata" : "No result data"}</h2>
        <button onClick={() => navigate("/")}>
          {language === "no" ? "Til Hjem" : "Back to Home"}
        </button>
      </div>
    );
  }

  const { score, total } = state;

  return (
    <div className="card">
      <h2>{language === "no" ? "Quiz ferdig!" : "Quiz Finished!"}</h2>
      <h3>
        {score} / {total}
      </h3>

      <div style={{ display: "flex", gap: 12 }}>
        <button onClick={() => navigate("/quiz")}>{language === "no" ? "Spill igjen" : "Play Again"}</button>
        <button onClick={() => navigate("/")}>{language === "no" ? "Til Hjem" : "Back to Home"}</button>
      </div>
    </div>
  );
}
