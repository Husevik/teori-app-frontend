import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const nav = useNavigate();

  return (
    <div className="card admin-card">
      <h2>Adminpanel</h2>

      <div className="admin-actions">
        <button onClick={() => nav("/admin/quiz/new")}>
          ➕ Ny quiz
        </button>

        <button onClick={() => nav("/admin/quizzes")}>
          📋 Se quizer
        </button>
      </div>
    </div>
  );
}
