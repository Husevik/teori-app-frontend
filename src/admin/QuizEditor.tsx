import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function QuizEditor() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    { text: "", answers: ["", "", "", ""], correctIndex: 0 },
  ]);
  const [saving, setSaving] = useState(false);

  function updateQuestion(i: number, field: string, value: any) {
    const copy = [...questions];
    // @ts-ignore
    copy[i][field] = value;
    setQuestions(copy);
  }

  async function saveQuiz() {
    setSaving(true);

    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/admin/quiz`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        questions,
      }),
    });

    setSaving(false);

    if (res.ok) {
      navigate("/admin/quizzes");
    } else {
      alert("Kunne ikke lagre quiz");
    }
  }

  return (
    <div className="card">
      <h2>Ny quiz</h2>

      <input
        placeholder="Quiz-tittel"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {questions.map((q, i) => (
        <div key={i} className="card">
          <input
            placeholder="Spørsmål"
            value={q.text}
            onChange={(e) =>
              updateQuestion(i, "text", e.target.value)
            }
          />

          {q.answers.map((a, ai) => (
            <input
              key={ai}
              placeholder={`Svar ${ai + 1}`}
              value={a}
              onChange={(e) => {
                const copy = [...questions];
                copy[i].answers[ai] = e.target.value;
                setQuestions(copy);
              }}
            />
          ))}

          <select
            value={q.correctIndex}
            onChange={(e) =>
              updateQuestion(i, "correctIndex", Number(e.target.value))
            }
          >
            <option value={0}>Riktig: 1</option>
            <option value={1}>Riktig: 2</option>
            <option value={2}>Riktig: 3</option>
            <option value={3}>Riktig: 4</option>
          </select>
        </div>
      ))}

      <button onClick={saveQuiz} disabled={saving}>
        {saving ? "Lagrer…" : "Lagre quiz"}
      </button>
    </div>
  );
}
