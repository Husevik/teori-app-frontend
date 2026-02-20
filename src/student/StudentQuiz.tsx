import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./StudentQuiz.css";

// Practice questions
const PRACTICE_QUESTIONS = [
  {
    id: "p1",
    text: "What is the capital of Norway?",
    answers: ["Oslo", "Bergen", "Trondheim"],
    correctIndex: 0,
  },
  {
    id: "p2",
    text: "Which color is the sky on a clear day?",
    answers: ["Blue", "Green", "Red"],
    correctIndex: 0,
  },
  {
    id: "p3",
    text: "What is 2 + 2?",
    answers: ["3", "4", "5"],
    correctIndex: 1,
  },
  {
    id: "p4",
    text: "Which animal barks?",
    answers: ["Cat", "Dog", "Bird"],
    correctIndex: 1,
  },
  {
    id: "p5",
    text: "What do you use to write?",
    answers: ["Pen", "Spoon", "Fork"],
    correctIndex: 0,
  },
  {
    id: "p6",
    text: "What is the boiling point of water?",
    answers: ["90°C", "100°C", "110°C"],
    correctIndex: 1,
  },
  {
    id: "p7",
    text: "Which planet is known as the Red Planet?",
    answers: ["Mars", "Venus", "Jupiter"],
    correctIndex: 0,
  },
  {
    id: "p8",
    text: "What do bees produce?",
    answers: ["Milk", "Honey", "Wax"],
    correctIndex: 1,
  },
  {
    id: "p9",
    text: "Which ocean is the largest?",
    answers: ["Atlantic", "Pacific", "Indian"],
    correctIndex: 1,
  },
  {
    id: "p10",
    text: "What gas do plants breathe in?",
    answers: ["Oxygen", "Carbon Dioxide", "Nitrogen"],
    correctIndex: 1,
  },
];

// Level questions
const LEVEL_QUESTIONS: Record<number, Question[]> = {
  1: [
    {
      id: "q1",
      text: "What does a red traffic light mean?",
      answers: ["Stop", "Go", "Slow down"],
      correctIndex: 0,
    },
    {
      id: "q2",
      text: "What shape is a stop sign?",
      answers: ["Circle", "Octagon", "Triangle", "Square"],
      correctIndex: 1,
    },
    {
      id: "q3",
      text: "What should you do at a pedestrian crossing?",
      answers: ["Speed up", "Stop for pedestrians", "Honk"],
      correctIndex: 1,
    },
    {
      id: "q4",
      text: "What color are warning signs?",
      answers: ["Red", "Yellow", "Blue", "Green"],
      correctIndex: 1,
    },
    {
      id: "q5",
      text: "What does a green traffic light mean?",
      answers: ["Stop", "Go", "Yield"],
      correctIndex: 1,
    },
    {
      id: "q6",
      text: "What must you do at a yield sign?",
      answers: ["Stop immediately", "Give way to other traffic", "Speed up"],
      correctIndex: 1,
    },
    {
      id: "q7",
      text: "What does a flashing yellow light mean?",
      answers: ["Stop", "Proceed with caution", "Go fast"],
      correctIndex: 1,
    },
    {
      id: "q8",
      text: "What is the speed limit in a residential area?",
      answers: ["30 km/h", "50 km/h", "70 km/h"],
      correctIndex: 0,
    },
    {
      id: "q9",
      text: "What does a blue circular sign indicate?",
      answers: ["Mandatory instruction", "Warning", "Information"],
      correctIndex: 0,
    },
    {
      id: "q10",
      text: "What should you do when you see a school bus stopped with flashing lights?",
      answers: ["Pass quickly", "Stop and wait", "Honk to warn"],
      correctIndex: 1,
    },
  ],
  2: [
    {
      id: "q1",
      text: "What is the minimum safe following distance?",
      answers: ["1 second", "2 seconds", "3 seconds", "5 seconds"],
      correctIndex: 2,
    },
    {
      id: "q2",
      text: "When is it allowed to overtake on the right?",
      answers: ["Never", "When the vehicle in front is turning left", "On highways only"],
      correctIndex: 1,
    },
    {
      id: "q3",
      text: "What does a double solid line mean?",
      answers: ["No passing", "Passing allowed", "Stop line"],
      correctIndex: 0,
    },
    {
      id: "q4",
      text: "What is the legal blood alcohol limit for drivers?",
      answers: ["0.0%", "0.2%", "0.5%", "1.0%"],
      correctIndex: 2,
    },
    {
      id: "q5",
      text: "What should you do when approaching a roundabout?",
      answers: ["Yield to traffic inside", "Speed up", "Stop"],
      correctIndex: 0,
    },
    {
      id: "q6",
      text: "What is the purpose of ABS brakes?",
      answers: ["Prevent skidding", "Increase speed", "Reduce fuel consumption"],
      correctIndex: 0,
    },
    {
      id: "q7",
      text: "When must you use headlights?",
      answers: ["Only at night", "During poor visibility", "Only on highways"],
      correctIndex: 1,
    },
    {
      id: "q8",
      text: "What is the meaning of a yellow diamond sign?",
      answers: ["Priority road", "No entry", "Stop"],
      correctIndex: 0,
    },
    {
      id: "q9",
      text: "What does a broken white line mean?",
      answers: ["Passing allowed", "No passing", "Stop line"],
      correctIndex: 0,
    },
    {
      id: "q10",
      text: "What is the correct hand signal for a left turn?",
      answers: ["Left arm straight out", "Left arm up", "Left arm down"],
      correctIndex: 0,
    },
  ],
  3: [
    {
      id: "q1",
      text: "What is the stopping distance at 90 km/h on dry road?",
      answers: ["50 meters", "70 meters", "120 meters", "150 meters"],
      correctIndex: 2,
    },
    {
      id: "q2",
      text: "What does a red and white triangular sign indicate?",
      answers: ["Warning", "Prohibition", "Mandatory"],
      correctIndex: 0,
    },
    {
      id: "q3",
      text: "What is the effect of hydroplaning?",
      answers: ["Loss of traction", "Increased braking", "Better steering"],
      correctIndex: 0,
    },
    {
      id: "q4",
      text: "When must you use winter tires?",
      answers: ["Between Nov and Apr", "Only in snow", "All year round"],
      correctIndex: 0,
    },
    {
      id: "q5",
      text: "What is the maximum allowed weight for a moped?",
      answers: ["100 kg", "150 kg", "200 kg"],
      correctIndex: 1,
    },
    {
      id: "q6",
      text: "What is the correct procedure at a railway crossing without barriers?",
      answers: ["Stop and listen", "Speed up", "Ignore if no train"],
      correctIndex: 0,
    },
    {
      id: "q7",
      text: "What does a flashing red traffic light mean?",
      answers: ["Stop and proceed when safe", "Go immediately", "Yield only"],
      correctIndex: 0,
    },
    {
      id: "q8",
      text: "What is the minimum tread depth for tires?",
      answers: ["1.6 mm", "2.0 mm", "3.0 mm"],
      correctIndex: 0,
    },
    {
      id: "q9",
      text: "What is the effect of oversteering?",
      answers: ["Rear wheels lose grip", "Front wheels lose grip", "No effect"],
      correctIndex: 0,
    },
    {
      id: "q10",
      text: "What is the correct distance to keep when overtaking a cyclist?",
      answers: ["1 meter", "1.5 meters", "2 meters"],
      correctIndex: 1,
    },
  ],
};

type Question = {
  id: string;
  text: string;
  answers: string[];
  correctIndex: number;
};

interface StudentQuizProps {
  mode?: "practice";
  level?: number;
}

export default function StudentQuiz({ mode, level }: StudentQuizProps) {
  const navigate = useNavigate();
  const params = useParams<{ levelId?: string }>();

  // Determine question set
  let questions: Question[] = [];
  let quizTitle = "Practice Quiz";

  if (mode === "practice") {
    questions = PRACTICE_QUESTIONS;
  } else if (params.levelId) {
    const lvl = Number(params.levelId);
    if (lvl >= 1 && lvl <= 3) {
      questions = LEVEL_QUESTIONS[lvl] ?? [];
      quizTitle = `Level ${lvl} Quiz`;
    }
  } else if (level) {
    if (level >= 1 && level <= 3) {
      questions = LEVEL_QUESTIONS[level] ?? [];
      quizTitle = `Level ${level} Quiz`;
    }
  } else {
    // Default fallback to practice
    questions = PRACTICE_QUESTIONS;
  }

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const confettiRef = useRef<HTMLDivElement>(null);

  const question = questions[current];

  // Confetti particle count and colors
  const CONFETTI_COUNT = 20;
  const CONFETTI_COLORS = ["#1e40af", "#2563eb", "#a5c9ff", "#d0e6ff"];

  // Create confetti particles around the button perimeter
  function createConfettiAroundButton(rect: DOMRect) {
    if (!confettiRef.current) return;
    confettiRef.current.innerHTML = "";

    // Center of button
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Radius for spawning confetti around button (slightly outside button edges)
    const radiusX = rect.width / 2 + 10; // 10px outside horizontal edges
    const radiusY = rect.height / 2 + 10; // 10px outside vertical edges

    for (let i = 0; i < CONFETTI_COUNT; i++) {
      const particle = document.createElement("div");
      particle.className = "confetti-particle";
      particle.style.backgroundColor = CONFETTI_COLORS[i % CONFETTI_COLORS.length];

      // Distribute particles evenly around ellipse perimeter
      const angle = (i / CONFETTI_COUNT) * 2 * Math.PI;

      // Start position on ellipse perimeter
      const startX = centerX + radiusX * Math.cos(angle);
      const startY = centerY + radiusY * Math.sin(angle);

      // Velocity vector for animation: outward from start position
      // We'll store velocity as CSS variables for animation
      // Velocity magnitude random between 20 and 60
      const velocityMagnitude = Math.random() * 40 + 20;
      const velocityX = Math.cos(angle) * velocityMagnitude;
      const velocityY = Math.sin(angle) * velocityMagnitude;

      particle.style.left = `${startX}px`;
      particle.style.top = `${startY}px`;
      particle.style.width = particle.style.height = `${Math.random() * 6 + 4}px`;

      // Set CSS variables for animation
      particle.style.setProperty("--dx", `${velocityX.toFixed(2)}px`);
      particle.style.setProperty("--dy", `${velocityY.toFixed(2)}px`);

      confettiRef.current.appendChild(particle);
    }
  }

  // Trigger confetti animation
  function triggerConfettiAroundButton(rect: DOMRect) {
    if (!confettiRef.current) return;
    createConfettiAroundButton(rect);
    confettiRef.current.classList.add("confetti-active");

    setTimeout(() => {
      if (confettiRef.current) {
        confettiRef.current.classList.remove("confetti-active");
        confettiRef.current.innerHTML = "";
      }
    }, 1500);
  }

  function handleAnswer(index: number, event: React.MouseEvent<HTMLButtonElement>) {
    if (selected !== null) return; // Prevent multiple clicks
    setSelected(index);
    const isCorrect = index === question.correctIndex;
    setFeedback(isCorrect ? "correct" : "wrong");

    if (isCorrect) {
      // Get button position for confetti origin
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      triggerConfettiAroundButton(rect);
    }

    setTimeout(() => {
      setSelected(null);
      setFeedback(null);
      if (current + 1 < questions.length) {
        setCurrent(current + 1);
      } else {
        // Calculate score
        const score = questions.reduce((acc, _q, i) => {
          if (i < current) return acc + 1;
          if (i === current && isCorrect) return acc + 1;
          return acc;
        }, 0);

        navigate("/level/result", {
          state: { score, total: questions.length },
        });
      }
    }, 1000);
  }

  if (!question) {
    return <div className="card">Ingen spørsmål tilgjengelig.</div>;
  }

  return (
    <>
      <div className="card quiz-card">
        <h2>{quizTitle}</h2>

        <div className="question">
          <h3>{question.text}</h3>
        </div>

        <div className="answers">
          {question.answers.map((answer, index) => {
            let className = "answer-btn";

            if (selected === index) {
              className += feedback === "correct" ? " correct pop" : " wrong shake";
            } else if (feedback && index === question.correctIndex) {
              className += " correct";
            }

            return (
              <button
                key={index}
                className={className}
                onClick={(e) => handleAnswer(index, e)}
                disabled={selected !== null}
                type="button"
              >
                {answer}
              </button>
            );
          })}
        </div>
      </div>

      {/* Confetti container appended to body, fixed position */}
      <div
        ref={confettiRef}
        className="confetti-container"
        aria-hidden="true"
        style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", pointerEvents: "none", zIndex: 9999, overflow: "visible" }}
      />
    </>
  );
}
