import { useNavigate } from "react-router-dom";
import StudentQuiz from "./StudentQuiz";
import "./Practice.css";

export default function Practice() {
  const navigate = useNavigate();

  return (
    <div className="student-page">
      <div className="student-container">
        <div className="card" style={{ position: "relative", paddingBottom: "72px" }}>
          <h2>Practice Quiz</h2>
          <StudentQuiz mode="practice" />

          <div style={{ position: "absolute", bottom: 20, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
            <button
              className="student-primary-button"
              onClick={() => navigate("/")}
              type="button"
            >
              Back to Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
