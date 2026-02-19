import React from "react";
import "./Leaderboards.css";

const MOCK_LEADERBOARD = [
  { name: "Alice", score: 1200 },
  { name: "Bob", score: 1100 },
  { name: "Charlie", score: 950 },
  { name: "Diana", score: 900 },
  { name: "Eve", score: 850 },
];

export default function Leaderboards() {
  return (
    <div className="student-page">
      <div className="student-container">
        <div className="student-leaderboards-container">
          <h2>Leaderboards</h2>
          <div className="card student-leaderboard-card">
            <table className="student-leaderboard-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Score</th>
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
          </div>
        </div>
      </div>
    </div>
  );
}
