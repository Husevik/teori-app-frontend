import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditQuiz() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    fetch(
      `https://web-app-backend.husevik.workers.dev/admin/quiz/${id}`
    )
      .then((r) => r.json())
      .then((q) => setTitle(q.title));
  }, [id]);

  async function save() {
    // simple v1: delete + recreate
    const token = localStorage.getItem("token");

    await fetch(
      `https://web-app-backend.husevik.workers.dev/admin/quiz/${id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    await fetch(
      "https://web-app-backend.husevik.workers.dev/admin/quiz",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title }),
      }
    );

    nav("/admin/quizzes");
  }

  return (
    <div className="card admin-card">
      <h2>Rediger quiz</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={save}>Lagre</button>
    </div>
  );
}
