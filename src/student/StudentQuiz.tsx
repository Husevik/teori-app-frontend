import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/quiz/random`)
      .then((r) => r.json())
      .then(setQuiz);
  }, []);

  if (!quiz) {
    return <div className="card">Ingen quiz tilgjengelig.</div>;
  }

  const question = quiz.questions[current];

  function next() {
    setSelected(null);
    setShowAnswer(false);
    setCurrent((c) => c + 1);
  }

  return (
    <div className="card quiz-card">
      <h2>{quiz.title}</h2>

      <div className="question">
        <h3>{question.text}</h3>
      </div>

      <div className="answers">
        {question.answers.map((answer, index) => {
          let className = "answer";

          if (showAnswer) {
            if (index === question.correctIndex) className += " correct";
            else if (index === selected) className += " wrong";
          } else if (index === selected) {
            className += " selected";
          }

          return (
            <button
              key={index}
              className={className}
              onClick={() => !showAnswer && setSelected(index)}
            >
              {answer}
            </button>
          );
        })}
      </div>

      {!showAnswer && (
        <button
          className="primary"
          disabled={selected === null}
          onClick={() => setShowAnswer(true)}
        >
          Sjekk svar
        </button>
      )}

      {showAnswer && current < quiz.questions.length - 1 && (
        <button className="primary" onClick={next}>
          Neste spørsmål
        </button>
      )}

      {showAnswer && current === quiz.questions.length - 1 && (
        <button className="primary" onClick={() => navigate("/")}>
          Tilbake til Hjem
        </button>
      )}
    </div>
  );
}
