import { useLocation, useNavigate } from "react-router-dom";

export default function QuizResult() {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as
    | { score: number; total: number }
    | undefined;

  if (!state) {
    return (
      <div className="card">
        <h2>Ingen resultatdata</h2>
        <button onClick={() => navigate("/")}>Til Hjem</button>
      </div>
    );
  }

  const { score, total } = state;

  return (
    <div className="card">
      <h2>Quiz ferdig!</h2>
      <h3>
        {score} / {total}
      </h3>

      <div style={{ display: "flex", gap: 12 }}>
        <button onClick={() => navigate("/quiz")}>Spill igjen</button>
        <button onClick={() => navigate("/")}>Til Hjem</button>
      </div>
    </div>
  );
}
