import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function QuizList() {
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const nav = useNavigate();

  async function load() {
    const token = localStorage.getItem("token");
    const r = await fetch(
      "https://web-app-backend.husevik.workers.dev/admin/quizzes",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setQuizzes(await r.json());
  }

  async function del(id: string) {
    if (!confirm("Slette quiz?")) return;

    const token = localStorage.getItem("token");
    await fetch(
      `https://web-app-backend.husevik.workers.dev/admin/quiz/${id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    load();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="card admin-card">
      <h2>Quizer</h2>

      {quizzes.map((q) => (
        <div key={q.id} className="card">
          <strong>{q.title}</strong>
          <div>
            <button onClick={() => nav(`/admin/quiz/edit/${q.id}`)}>
              ✏️ Rediger
            </button>
            <button onClick={() => del(q.id)}>🗑️ Slett</button>
          </div>
        </div>
      ))}
    </div>
  );
}
