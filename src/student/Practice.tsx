import React from "react";
import { useNavigate } from "react-router-dom";
import StudentQuiz from "./StudentQuiz";
import "./Practice.css";

export default function Practice() {
  const navigate = useNavigate();

  return (
    <div className="student-page">
      <div className="student-container">
        <div className="student-practice-container">
          <h2>Practice Quiz</h2>
          <StudentQuiz mode="practice" />
          <div className="student-back-button-container">
            <button className="student-back-button" onClick={() => navigate("/")}>⬅ Back to Menu</button>
          </div>
        </div>
      </div>
    </div>
  );
}
