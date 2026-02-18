import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

type Question = {
  id: string;
  text: string;
  answers: string[];
  correct_index: number;
};

type Quiz = {
  id: string;
  title: string;
  questions: Question[];
};

export default function Level1() {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/quiz/random`)
      .then((r) => r.json())
      .then((data) => {
        setQuiz(data);
      })
      .catch(() => {
        setQuiz(null);
      });
  }, []);

  // 🔒 Ikke render før quiz finnes
  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return <div className="card">Ingen quiz tilgjengelig.</div>;
  }

  const question = quiz.questions[current];

  function handleAnswer(index: number) {
    if (answered) return;

    setSelected(index);
    setAnswered(true);

    if (index === question.correct_index) {
      setScore((prev) => prev + 1);
    }
  }

  function nextQuestion() {
  if (!quiz) return;

  if (current + 1 < quiz.questions.length) {
    setCurrent((prev) => prev + 1);
    setSelected(null);
    setAnswered(false);
  } else {
    navigate("/level/result", {
      state: {
        score,
        total: quiz.questions.length,
      },
    });
  }
}


  return (
    <div className="card">
      <h2>{quiz.title}</h2>

      <p>
        Spørsmål {current + 1} av {quiz.questions.length}
      </p>

      <h3>{question.text}</h3>

      <div style={{ display: "grid", gap: 10 }}>
        {question.answers.map((answer, index) => {
          let background = "#f0f4ff";

          if (answered) {
            if (index === question.correct_index) {
              background = "#4caf50";
            } else if (index === selected) {
              background = "#f44336";
            }
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              style={{
                padding: 12,
                borderRadius: 10,
                border: "none",
                cursor: "pointer",
                background,
                color: answered ? "white" : "#1e3a8a",
                fontWeight: 600,
              }}
            >
              {answer}
            </button>
          );
        })}
      </div>

      {answered && (
        <button
          onClick={nextQuestion}
          style={{
            marginTop: 20,
            padding: 10,
            borderRadius: 8,
            border: "none",
            background: "#1e3a8a",
            color: "white",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Neste →
        </button>
      )}

      <button
        onClick={() => navigate("/")}
        style={{
          marginTop: 15,
          background: "transparent",
          border: "none",
          color: "#1e3a8a",
          cursor: "pointer",
        }}
      >
        ← Tilbake til hjem
      </button>
    </div>
  );
}
