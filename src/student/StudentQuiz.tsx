import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuizResult from "./QuizResult";

const API_URL = import.meta.env.VITE_API_URL;

type Answer = {
  text: string;
};

type Question = {
  id: string;
  text: string;
  answers: Answer[];
  correct_index: number;
};

type Quiz = {
  id: string;
  title: string;
  questions: Question[];
};

export default function StudentQuiz() {
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/quiz/random`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data && Array.isArray(data.questions) && data.questions.length > 0) {
          setQuiz(data);
        } else {
          setQuiz(null);
        }
      })
      .catch(() => setQuiz(null))
      .finally(() => setLoading(false));
  }, []);

  /* ---------- STATES ---------- */

  if (loading) {
    return <div className="card">Laster quiz…</div>;
  }

  if (!quiz || quiz.questions.length === 0) {
    return (
      <div className="card">
        <p>Ingen quiz tilgjengelig.</p>
        <button onClick={() => navigate("/")}>⬅️ Tilbake til Hjem</button>
      </div>
    );
  }

  // 🔒 TypeScript vet nå at quiz ALDRI er null under
  const safeQuiz = quiz;
  const question = safeQuiz.questions[current];

  if (!question) {
    return <div className="card">Laster spørsmål…</div>;
  }

  if (finished) {
    return (
      <div className="card">
        <QuizResult score={score} total={safeQuiz.questions.length} />

        <button
          style={{ marginTop: "16px" }}
          onClick={() => navigate("/")}
        >
          ⬅️ Tilbake til Hjem
        </button>
      </div>
    );
  }

  /* ---------- ACTIONS ---------- */

  function checkAnswer() {
    if (selected === null) return;

    if (selected === question.correct_index) {
      setScore((s) => s + 1);
    }
    setChecked(true);
  }

  function nextQuestion() {
    setChecked(false);
    setSelected(null);

    if (current + 1 < safeQuiz.questions.length) {
      setCurrent((c) => c + 1);
    } else {
      setFinished(true);
    }
  }

  /* ---------- UI ---------- */

  return (
    <div className="card">
      <button
        style={{ marginBottom: "12px" }}
        onClick={() => navigate("/")}
      >
        ⬅️ Tilbake til Hjem
      </button>

      <h2>{safeQuiz.title}</h2>

      <p>
        Spørsmål {current + 1} / {safeQuiz.questions.length}
      </p>

      <h3>{question.text}</h3>

      <div>
        {question.answers.map((a, i) => {
          let bg = "#fff";

          if (checked) {
            if (i === question.correct_index) bg = "#b6f5c2";
            else if (i === selected) bg = "#f5b6b6";
          }

          return (
            <button
              key={i}
              onClick={() => !checked && setSelected(i)}
              style={{
                display: "block",
                marginBottom: "8px",
                background: bg,
                padding: "10px",
                width: "100%",
              }}
            >
              {a.text}
            </button>
          );
        })}
      </div>

      {!checked ? (
        <button disabled={selected === null} onClick={checkAnswer}>
          Sjekk svar
        </button>
      ) : (
        <button onClick={nextQuestion}>Neste</button>
      )}
    </div>
  );
}
