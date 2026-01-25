import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

type Quiz = {
  id: string;
  title: string;
  created_at: string;
};

export default function QuizList() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${API_URL}/admin/quizzes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r) => r.json())
      .then((data) => {
        console.log("QUIZ API RESPONSE:", data);

        if (Array.isArray(data)) {
          setQuizzes(data);
        } else {
          setQuizzes([]);
        }
      })
      .catch((err) => {
        console.error("QUIZ FETCH ERROR", err);
        setQuizzes([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="card">Laster quizzer…</div>;
  }

  return (
    <div className="card">
      <h2>Quizzer</h2>

      {quizzes.length === 0 && <p>Ingen quizzer funnet.</p>}

      <ul>
        {quizzes.map((q) => (
          <li key={q.id} style={{ marginBottom: "12px" }}>
            <strong>{q.title}</strong>
            <br />
            <button onClick={() => navigate(`/admin/quizzes/${q.id}`)}>
              Rediger
            </button>
          </li>
        ))}
      </ul>

      <button onClick={() => navigate("/admin/quizzes/new")}>
        ➕ Ny quiz
      </button>
    </div>
  );
}
