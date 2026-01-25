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

    if (!token) {
      console.error("Ingen token – ikke innlogget");
      setLoading(false);
      return;
    }

    fetch(`${API_URL}/admin/quizzes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Kunne ikke hente quizzer");
        }
        return res.json();
      })
      .then((data) => {
        console.log("QUIZZES FROM API:", data); // 👈 VIKTIG DEBUG
        setQuizzes(data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="card">Laster quizzer…</div>;
  }

  return (
    <div className="card">
      <h2>Quizzer</h2>

      <button onClick={() => navigate("/admin/quizzes/new")}>
        ➕ Ny quiz
      </button>

      {quizzes.length === 0 ? (
        <p>Ingen quizzer funnet.</p>
      ) : (
        <ul style={{ marginTop: 16 }}>
          {quizzes.map((quiz) => (
            <li key={quiz.id} style={{ marginBottom: 8 }}>
              <strong>{quiz.title}</strong>{" "}
              <button
                onClick={() => navigate(`/admin/quizzes/${quiz.id}`)}
              >
                Rediger
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
