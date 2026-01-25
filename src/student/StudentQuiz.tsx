import { useEffect, useState } from "react";
import QuizResult from "./QuizResult";

const API_URL = import.meta.env.VITE_API_URL;

type Question = {
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
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/quiz/random`)
      .then((r) => r.json())
      .then((data) => {
        if (data?.questions) setQuiz(data);
      });
  }, []);

  if (!quiz) {
    return <div className="card">Ingen quiz tilgjengelig.</div>;
  }

  const q = quiz; // ✅ TypeScript vet nå at quiz IKKE er null
  const question = q.questions[current];

  if (finished) {
    return <QuizResult score={score} total={q.questions.length} />;
  }

  function checkAnswer() {
    if (selected === null) return;
    setChecked(true);
    if (selected === question.correctIndex) {
      setScore((s) => s + 1);
    }
  }

  function next() {
    setChecked(false);
    setSelected(null);

    if (current + 1 < q.questions.length) {
      setCurrent((c) => c + 1);
    } else {
      setFinished(true);
    }
  }

  return (
    <div className="card">
      <h2>{q.title}</h2>
      <h3>{question.text}</h3>

      {question.answers.map((a, i) => {
        let className = "";

        if (checked) {
          if (i === question.correctIndex) className = "correct";
          else if (i === selected) className = "wrong";
        }

        return (
          <button
            key={i}
            className={`answer ${className}`}
            disabled={checked}
            onClick={() => setSelected(i)}
          >
            {a}
          </button>
        );
      })}

      {!checked ? (
        <button onClick={checkAnswer} disabled={selected === null}>
          Sjekk svar
        </button>
      ) : (
        <button onClick={next}>Neste</button>
      )}
    </div>
  );
}

