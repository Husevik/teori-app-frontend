import { useEffect, useState } from "react";
import QuizResult from "./QuizResult";

const API_URL = import.meta.env.VITE_API_URL;

type Question = {
  id: string;
  text: string;
  answers: string[];
  correctIndex: number;
};

type Quiz = {
  id: string;
  title: string;
  questions: Question[];
};

export default function StudentQuiz() {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  // 🔹 Hent quiz (første tilgjengelige)
  useEffect(() => {
    fetch(`${API_URL}/quizzes`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setQuiz(data[0]);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  // 🔹 LOADING
  if (loading) {
    return <div className="card">Laster quiz…</div>;
  }

  // 🔹 INGEN QUIZ
  if (!quiz || quiz.questions.length === 0) {
    return <div className="card">Ingen quiz tilgjengelig.</div>;
  }

  // 🔹 FERDIG
  if (finished) {
    return <QuizResult score={score} total={quiz.questions.length} />;
  }

  const question = quiz.questions[current];

  function checkAnswer() {
    if (selected === null) return;

    setChecked(true);

    if (selected === question.correctIndex) {
      setScore((s) => s + 1);
    }
  }

  function nextQuestion() {
    setChecked(false);
    setSelected(null);

    if (current + 1 < quiz.questions.length) {
      setCurrent((c) => c + 1);
    } else {
      setFinished(true);
    }
  }

  return (
    <div className="card">
      <h2>{quiz.title}</h2>

      <p>
        Spørsmål {current + 1} av {quiz.questions.length}
      </p>

      <h3>{question.text}</h3>

      <div style={{ display: "grid", gap: "8px", marginTop: "12px" }}>
        {question.answers.map((answer, index) => {
          let background = "#f0f0f0";

          // 🔥 FARGE KUN ETTER "SJEKK SVAR"
          if (checked) {
            if (index === question.correctIndex) {
              background = "#7fc8a9"; // grønn
            } else if (index === selected) {
              background = "#f28b82"; // rød
            }
          } else if (index === selected) {
            background = "#dcecf6"; // valgt, men ikke sjekket
          }

          return (
            <button
              key={index}
              onClick={() => !checked && setSelected(index)}
              style={{
                padding: "12px",
                borderRadius: "10px",
                border: "none",
                cursor: checked ? "default" : "pointer",
                background,
                textAlign: "left",
              }}
            >
              {answer}
            </button>
          );
        })}
      </div>

      {/* 🔹 HANDLING */}
      <div style={{ marginTop: "16px" }}>
        {!checked ? (
          <button
            onClick={checkAnswer}
            disabled={selected === null}
          >
            ✅ Sjekk svar
          </button>
        ) : (
          <button onClick={nextQuestion}>
            ➡️ Neste
          </button>
        )}
      </div>
    </div>
  );
}

