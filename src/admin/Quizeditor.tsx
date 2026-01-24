import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Answer = {
  id: string;
  text: string;
  is_correct: boolean;
};

type Question = {
  id: string;
  text: string;
  answers: Answer[];
};

export default function QuizEditor() {
  const { id } = useParams(); // quiz id
  const token = localStorage.getItem("token");

  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [saving, setSaving] = useState(false);

  // ---------- LOAD QUIZ ----------
  useEffect(() => {
    if (!id) return;

    fetch(`${import.meta.env.VITE_API_URL}/admin/quiz/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(data => {
        setTitle(data.title);
        setQuestions(data.questions || []);
      });
  }, [id]);

  // ---------- HELPERS ----------
  function addQuestion() {
    setQuestions(qs => [
      ...qs,
      {
        id: crypto.randomUUID(),
        text: "",
        answers: [
          { id: crypto.randomUUID(), text: "", is_correct: false },
          { id: crypto.randomUUID(), text: "", is_correct: false },
        ],
      },
    ]);
  }

  function addAnswer(qIndex: number) {
    const copy = [...questions];
    copy[qIndex].answers.push({
      id: crypto.randomUUID(),
      text: "",
      is_correct: false,
    });
    setQuestions(copy);
  }

  function updateQuestionText(i: number, text: string) {
    const copy = [...questions];
    copy[i].text = text;
    setQuestions(copy);
  }

  function updateAnswerText(qi: number, ai: number, text: string) {
    const copy = [...questions];
    copy[qi].answers[ai].text = text;
    setQuestions(copy);
  }

  function setCorrectAnswer(qi: number, ai: number) {
    const copy = [...questions];
    copy[qi].answers.forEach((a, i) => {
      a.is_correct = i === ai;
    });
    setQuestions(copy);
  }

  function removeQuestion(i: number) {
    setQuestions(qs => qs.filter((_, idx) => idx !== i));
  }

  // ---------- SAVE ----------
  async function saveQuiz() {
    setSaving(true);

    await fetch(`${import.meta.env.VITE_API_URL}/admin/quiz/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, questions }),
    });

    setSaving(false);
    alert("Quiz lagret ✅");
  }

  // ---------- UI ----------
  return (
    <div className="card admin-card">
      <h2>Rediger quiz</h2>

      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Quiz-tittel"
        style={{ width: "100%", marginBottom: 16, padding: 8 }}
      />

      {questions.map((q, qi) => (
        <div key={q.id} className="card" style={{ marginBottom: 16 }}>
          <input
            value={q.text}
            onChange={e => updateQuestionText(qi, e.target.value)}
            placeholder={`Spørsmål ${qi + 1}`}
            style={{ width: "100%", marginBottom: 12 }}
          />

          {q.answers.map((a, ai) => (
            <div
              key={a.id}
              style={{ display: "flex", gap: 8, marginBottom: 8 }}
            >
              <input
                type="radio"
                checked={a.is_correct}
                onChange={() => setCorrectAnswer(qi, ai)}
              />
              <input
                value={a.text}
                onChange={e => updateAnswerText(qi, ai, e.target.value)}
                placeholder={`Svar ${ai + 1}`}
                style={{ flex: 1 }}
              />
            </div>
          ))}

          <button onClick={() => addAnswer(qi)}>➕ Legg til svar</button>
          <button
            onClick={() => removeQuestion(qi)}
            style={{ marginLeft: 8 }}
          >
            🗑 Fjern spørsmål
          </button>
        </div>
      ))}

      <button onClick={addQuestion}>➕ Nytt spørsmål</button>

      <div style={{ marginTop: 24 }}>
        <button onClick={saveQuiz} disabled={saving}>
          {saving ? "Lagrer…" : "💾 Lagre quiz"}
        </button>
      </div>
    </div>
  );
}
