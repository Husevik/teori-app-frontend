import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="card admin-card">
      <h2>Adminpanel</h2>
      <p>Administrer quiz, innhold og progresjon.</p>

      <div className="admin-actions">
        <button onClick={() => navigate("/admin/quizzes")}>
          📋 Alle quizer
        </button>

        <button onClick={() => navigate("/admin/quizzes/new")}>
          ➕ Ny quiz
        </button>
      </div>
    </div>
  );
}
