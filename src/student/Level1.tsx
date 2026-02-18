import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

type Answer = {
  text: string;
  answer_index: number;
};

type Question = {
  id: string;
  text: string;
  correct_index: number;
  answers: Answer[];
};

type Quiz = {
  id: string;
  title: string;
  questions: Question[];
};

export default function Level1() {
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch(`${API_URL}/quiz/random`)
      .then((r) => r.json())
      .then((data) => {
        if (data?.questions?.length) {
          setQuiz(data);
        } else {
          setQuiz(null);
        }
      })
      .catch(() => setQuiz(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="card">Laster level…</div>;
  }

  if (!quiz || quiz.questions.length === 0) {
    return (
      <div className="card">
        <h2>Ingen quiz tilgjengelig</h2>
        <button onClick={() => navigate("/")}>⬅ Tilbake</button>
      </div>
    );
  }

  // 👇 Nå vet TypeScript at denne aldri er null
  const currentQuiz = quiz;
  const question = currentQuiz.questions[current];

  function handleAnswer(index: number) {
    const correct = index === question.correct_index;

    if (!correct) return;

    const newScore = score + 10;
    setScore(newScore);

    if (current + 1 < currentQuiz.questions.length) {
      setTimeout(() => {
        setCurrent((prev) => prev + 1);
      }, 300);
    } else {
      navigate("/level/result", {
        state: {
          score: newScore,
          total: currentQuiz.questions.length,
        },
      });
    }
  }

  return (
    <div className="card level-card">
      <div className="level-header">
        <h2>Level 1</h2>
        <div className="score-badge">{score} poeng</div>
      </div>

      <h3>{question.text}</h3>

      <div className="answers">
        {question.answers.map((a, i) => (
          <button
            key={i}
            className="answer-btn"
            onClick={() => handleAnswer(i)}
          >
            {a.text}
          </button>
        ))}
      </div>

      <div style={{ marginTop: 20 }}>
        <button onClick={() => navigate("/")}>⬅ Avslutt level</button>
      </div>
    </div>
  );
}
