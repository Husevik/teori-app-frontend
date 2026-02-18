import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

type Question = {
  id: string;
  text: string;
  correct_index: number;
  answers: { text: string }[];
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
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/quiz/random`)
      .then((r) => r.json())
      .then((data) => {
        if (data?.questions?.length > 0) {
          setQuiz(data);
        }
      });
  }, []);

  if (!quiz) {
    return <div className="card">Laster level…</div>;
  }

  const question = quiz.questions[current];

  function handleAnswer(index: number) {
    if (selected !== null) return;

    setSelected(index);

    if (index === question.correct_index) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      if (current + 1 < quiz.questions.length) {
        setCurrent((prev) => prev + 1);
        setSelected(null);
      } else {
        navigate("/level/result", {
          state: { score, total: quiz.questions.length },
        });
      }
    }, 800);
  }

  return (
    <div className="card">
      <h2>Level 1</h2>

      <p>
        Spørsmål {current + 1} / {quiz.questions.length}
      </p>

      <h3>{question.text}</h3>

      <div style={{ display: "grid", gap: 12 }}>
        {question.answers.map((a, i) => {
          let className = "answer-button";

          if (selected !== null) {
            if (i === question.correct_index) {
              className += " correct";
            } else if (i === selected) {
              className += " wrong";
            }
          }

          return (
            <button
              key={i}
              className={className}
              onClick={() => handleAnswer(i)}
            >
              {a.text}
            </button>
          );
        })}
      </div>

      <button
        style={{ marginTop: 20 }}
        onClick={() => navigate("/")}
      >
        Avbryt
      </button>
    </div>
  );
}
