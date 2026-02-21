import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./StudentQuiz.css";
import { useLanguage } from "../locales/LanguageContext";

interface Question {
  id: string;
  text: {
    no: string;
    en: string;
  };
  answers: {
    no: string[];
    en: string[];
  };
  correctIndex: number;
}

// Updated Norwegian and English quiz questions with accurate Norwegian traffic rules
const PRACTICE_QUESTIONS: Question[] = [
  {
    id: "p1",
    text: { no: "Hva er hovedstaden i Norge?", en: "What is the capital of Norway?" },
    answers: { no: ["Oslo", "Bergen", "Trondheim"], en: ["Oslo", "Bergen", "Trondheim"] },
    correctIndex: 0,
  },
  {
    id: "p2",
    text: { no: "Hvilken farge har himmelen på en klar dag?", en: "Which color is the sky on a clear day?" },
    answers: { no: ["Blå", "Grønn", "Rød"], en: ["Blue", "Green", "Red"] },
    correctIndex: 0,
  },
  {
    id: "p3",
    text: { no: "Hva er 2 + 2?", en: "What is 2 + 2?" },
    answers: { no: ["3", "4", "5"], en: ["3", "4", "5"] },
    correctIndex: 1,
  },
  {
    id: "p4",
    text: { no: "Hvilket dyr bjeffer?", en: "Which animal barks?" },
    answers: { no: ["Katt", "Hund", "Fugl"], en: ["Cat", "Dog", "Bird"] },
    correctIndex: 1,
  },
  {
    id: "p5",
    text: { no: "Hva bruker du til å skrive?", en: "What do you use to write?" },
    answers: { no: ["Penn", "Ske", "Gaffel"], en: ["Pen", "Spoon", "Fork"] },
    correctIndex: 0,
  },
];

const LEVEL_QUESTIONS: Record<number, Question[]> = {
  1: [
    {
      id: "q1",
      text: {
        no: "Hva betyr et rødt trafikklys?",
        en: "What does a red traffic light mean?",
      },
      answers: {
        no: ["Stopp", "Kjør", "Senk farten"],
        en: ["Stop", "Go", "Slow down"],
      },
      correctIndex: 0,
    },
    {
      id: "q2",
      text: {
        no: "Hva slags form har et stoppskilt?",
        en: "What shape is a stop sign?",
      },
      answers: {
        no: ["Sirkel", "Åttekant", "Trekant", "Firkant"],
        en: ["Circle", "Octagon", "Triangle", "Square"],
      },
      correctIndex: 1,
    },
    {
      id: "q3",
      text: {
        no: "Hva skal du gjøre ved et fotgjengerfelt?",
        en: "What should you do at a pedestrian crossing?",
      },
      answers: {
        no: ["Øk farten", "Stopp for fotgjengere", "Bruk hornet"],
        en: ["Speed up", "Stop for pedestrians", "Honk"],
      },
      correctIndex: 1,
    },
    {
      id: "q4",
      text: {
        no: "Hvilken farge har varselskilt?",
        en: "What color are warning signs?",
      },
      answers: {
        no: ["Rød", "Gul", "Blå", "Grønn"],
        en: ["Red", "Yellow", "Blue", "Green"],
      },
      correctIndex: 0,
    },
    {
      id: "q5",
      text: {
        no: "Hva betyr et grønt trafikklys?",
        en: "What does a green traffic light mean?",
      },
      answers: {
        no: ["Stopp", "Kjør", "Gi vikeplikt"],
        en: ["Stop", "Go", "Yield"],
      },
      correctIndex: 1,
    },
    {
      id: "q6",
      text: {
        no: "Hva må du gjøre ved et vikepliktskilt?",
        en: "What must you do at a yield sign?",
      },
      answers: {
        no: ["Stopp umiddelbart", "Gi vikeplikt til annen trafikk", "Øk farten"],
        en: ["Stop immediately", "Give way to other traffic", "Speed up"],
      },
      correctIndex: 1,
    },
    {
      id: "q7",
      text: {
        no: "Hva betyr blinkende gult lys?",
        en: "What does a flashing yellow light mean?",
      },
      answers: {
        no: ["Stopp", "Kjør med forsiktighet", "Kjør fort"],
        en: ["Stop", "Proceed with caution", "Go fast"],
      },
      correctIndex: 1,
    },
    {
      id: "q8",
      text: {
        no: "Hva er fartsgrensen i boligområde?",
        en: "What is the speed limit in a residential area?",
      },
      answers: {
        no: ["50 km/t", "30 km/t", "70 km/t"],
        en: ["50 km/h", "30 km/h", "70 km/h"],
      },
      correctIndex: 0,
    },
    {
      id: "q9",
      text: {
        no: "Hva betyr et blått rundt skilt?",
        en: "What does a blue circular sign indicate?",
      },
      answers: {
        no: ["Påbudt kjørefelt", "Varsel", "Informasjon"],
        en: ["Mandatory instruction", "Warning", "Information"],
      },
      correctIndex: 0,
    },
    {
      id: "q10",
      text: {
        no: "Hva skal du gjøre når du ser en skolebuss som står med blinkende lys?",
        en: "What should you do when you see a school bus stopped with flashing lights?",
      },
      answers: {
        no: ["Kjør forbi raskt", "Stopp og vent", "Bruk hornet for å advare"],
        en: ["Pass quickly", "Stop and wait", "Honk to warn"],
      },
      correctIndex: 1,
    },
  ],
  2: [
    {
      id: "q1",
      text: {
        no: "Hva er minimum sikker avstand til bilen foran?",
        en: "What is the minimum safe following distance?",
      },
      answers: {
        no: ["1 sekund", "2 sekunder", "3 sekunder", "5 sekunder"],
        en: ["1 second", "2 seconds", "3 seconds", "5 seconds"],
      },
      correctIndex: 2,
    },
    {
      id: "q2",
      text: {
        no: "Når er det tillatt å kjøre forbi på høyre side?",
        en: "When is it allowed to overtake on the right?",
      },
      answers: {
        no: ["Aldri", "Når bilen foran svinger til venstre", "Kun på motorveier"],
        en: ["Never", "When the vehicle in front is turning left", "On highways only"],
      },
      correctIndex: 1,
    },
    {
      id: "q3",
      text: {
        no: "Hva betyr en dobbel heltrukken linje?",
        en: "What does a double solid line mean?",
      },
      answers: {
        no: ["Forbudt å kjøre forbi", "Kjøring tillatt", "Stopp-linje"],
        en: ["No passing", "Passing allowed", "Stop line"],
      },
      correctIndex: 0,
    },
    {
      id: "q4",
      text: {
        no: "Hva er den lovlige promillegrensen for bilførere?",
        en: "What is the legal blood alcohol limit for drivers?",
      },
      answers: {
        no: ["0,0%", "0,2%", "0,5%", "1,0%"],
        en: ["0.0%", "0.2%", "0.5%", "1.0%"],
      },
      correctIndex: 2,
    },
    {
      id: "q5",
      text: {
        no: "Hva skal du gjøre når du nærmer deg en rundkjøring?",
        en: "What should you do when approaching a roundabout?",
      },
      answers: {
        no: ["Gi vikeplikt til trafikk i rundkjøringen", "Øk farten", "Stopp"],
        en: ["Yield to traffic inside", "Speed up", "Stop"],
      },
      correctIndex: 0,
    },
    {
      id: "q6",
      text: {
        no: "Hva er hensikten med ABS-bremser?",
        en: "What is the purpose of ABS brakes?",
      },
      answers: {
        no: ["Forhindre låsing av hjul", "Øke hastighet", "Redusere drivstofforbruk"],
        en: ["Prevent skidding", "Increase speed", "Reduce fuel consumption"],
      },
      correctIndex: 0,
    },
    {
      id: "q7",
      text: {
        no: "Når må du bruke frontlys?",
        en: "When must you use headlights?",
      },
      answers: {
        no: ["Kun om natten", "Ved dårlig sikt", "Kun på motorveier"],
        en: ["Only at night", "During poor visibility", "Only on highways"],
      },
      correctIndex: 1,
    },
    {
      id: "q8",
      text: {
        no: "Hva betyr et gult diamantformet skilt?",
        en: "What is the meaning of a yellow diamond sign?",
      },
      answers: {
        no: ["Forkjørsvei", "Innkjøring forbudt", "Stopp"],
        en: ["Priority road", "No entry", "Stop"],
      },
      correctIndex: 0,
    },
    {
      id: "q9",
      text: {
        no: "Hva betyr en stiplet hvit linje?",
        en: "What does a broken white line mean?",
      },
      answers: {
        no: ["Kjøring tillatt forbi", "Forbudt å kjøre forbi", "Stopp-linje"],
        en: ["Passing allowed", "No passing", "Stop line"],
      },
      correctIndex: 0,
    },
    {
      id: "q10",
      text: {
        no: "Hva er riktig håndsignal for venstresving?",
        en: "What is the correct hand signal for a left turn?",
      },
      answers: {
        no: ["Venstre arm rett ut", "Venstre arm opp", "Venstre arm ned"],
        en: ["Left arm straight out", "Left arm up", "Left arm down"],
      },
      correctIndex: 0,
    },
  ],
  3: [
    {
      id: "q1",
      text: {
        no: "Hva er stoppdistansen ved 90 km/t på tørr vei?",
        en: "What is the stopping distance at 90 km/h on dry road?",
      },
      answers: {
        no: ["50 meter", "70 meter", "120 meter", "150 meter"],
        en: ["50 meters", "70 meters", "120 meters", "150 meters"],
      },
      correctIndex: 2,
    },
    {
      id: "q2",
      text: {
        no: "Hva betyr et rødt og hvitt trekantet skilt?",
        en: "What does a red and white triangular sign indicate?",
      },
      answers: {
        no: ["Varsel", "Forbud", "Påbud"],
        en: ["Warning", "Prohibition", "Mandatory"],
      },
      correctIndex: 0,
    },
    {
      id: "q3",
      text: {
        no: "Hva er effekten av vannplaning?",
        en: "What is the effect of hydroplaning?",
      },
      answers: {
        no: ["Tap av veigrep", "Økt bremselengde", "Bedre styring"],
        en: ["Loss of traction", "Increased braking", "Better steering"],
      },
      correctIndex: 0,
    },
    {
      id: "q4",
      text: {
        no: "Når må du bruke vinterdekk?",
        en: "When must you use winter tires?",
      },
      answers: {
        no: ["Mellom november og april", "Kun ved snø", "Hele året"],
        en: ["Between Nov and Apr", "Only in snow", "All year round"],
      },
      correctIndex: 0,
    },
    {
      id: "q5",
      text: {
        no: "Hva er maksimal tillatt vekt for en moped?",
        en: "What is the maximum allowed weight for a moped?",
      },
      answers: {
        no: ["100 kg", "150 kg", "200 kg"],
        en: ["100 kg", "150 kg", "200 kg"],
      },
      correctIndex: 1,
    },
    {
      id: "q6",
      text: {
        no: "Hva er riktig prosedyre ved en jernbaneovergang uten bommer?",
        en: "What is the correct procedure at a railway crossing without barriers?",
      },
      answers: {
        no: ["Stopp og lytt", "Øk farten", "Ignorer hvis ingen tog"],
        en: ["Stop and listen", "Speed up", "Ignore if no train"],
      },
      correctIndex: 0,
    },
    {
      id: "q7",
      text: {
        no: "Hva betyr blinkende rødt trafikklys?",
        en: "What does a flashing red traffic light mean?",
      },
      answers: {
        no: ["Stopp og kjør når det er trygt", "Kjør umiddelbart", "Gi bare vikeplikt"],
        en: ["Stop and proceed when safe", "Go immediately", "Yield only"],
      },
      correctIndex: 0,
    },
    {
      id: "q8",
      text: {
        no: "Hva er minimum mønsterdybde på dekk?",
        en: "What is the minimum tread depth for tires?",
      },
      answers: {
        no: ["1,6 mm", "2,0 mm", "3,0 mm"],
        en: ["1.6 mm", "2.0 mm", "3.0 mm"],
      },
      correctIndex: 0,
    },
    {
      id: "q9",
      text: {
        no: "Hva er effekten av overstyring?",
        en: "What is the effect of oversteering?",
      },
      answers: {
        no: ["Bakhjul mister grep", "Forhjul mister grep", "Ingen effekt"],
        en: ["Rear wheels lose grip", "Front wheels lose grip", "No effect"],
      },
      correctIndex: 0,
    },
    {
      id: "q10",
      text: {
        no: "Hva er riktig avstand når du kjører forbi en syklist?",
        en: "What is the correct distance to keep when overtaking a cyclist?",
      },
      answers: {
        no: ["1 meter", "1,5 meter", "2 meter"],
        en: ["1 meter", "1.5 meters", "2 meters"],
      },
      correctIndex: 1,
    },
  ],
};

interface StudentQuizProps {
  mode?: "practice";
  level?: number;
}

function getBestResultStorageKey(level: number): string {
  return `best_traffic_light_level_${level}`;
}

function getBestResult(level: number): number {
  if (level < 1) return 0;
  const key = getBestResultStorageKey(level);
  const stored = localStorage.getItem(key);
  if (!stored) return 0;
  const val = Number(stored);
  if (val >= 1 && val <= 3) return val;
  return 0;
}

function setBestResult(level: number, greenLights: number): void {
  if (level < 1) return;
  if (greenLights < 0 || greenLights > 3) return;
  const key = getBestResultStorageKey(level);
  const currentBest = getBestResult(level);
  if (greenLights > currentBest) {
    localStorage.setItem(key, greenLights.toString());
  }
}

function calculateGreenLights(correctCount: number, totalQuestions: number): number {
  if (totalQuestions === 10) {
    if (correctCount === 10) return 3; // 3 green
    if (correctCount === 9) return 2; // 2 green
    if (correctCount === 8) return 1; // 1 green
    if (correctCount >= 5) return 0; // yellow only (handled separately)
    return 0; // red only
  }
  // Fallback for other question counts: simple thresholds
  const ratio = correctCount / totalQuestions;
  if (ratio === 1) return 3;
  if (ratio >= 0.9) return 2;
  if (ratio >= 0.8) return 1;
  return 0;
}

export default function StudentQuiz({ mode, level }: StudentQuizProps) {
  const navigate = useNavigate();
  const params = useParams<{ levelId?: string }>();
  const { language, t } = useLanguage();

  let questions: Question[] = [];
  let quizTitle = t("Practice Quiz");

  let currentLevel = 0;

  if (mode === "practice") {
    questions = PRACTICE_QUESTIONS;
  } else if (params.levelId) {
    const lvl = Number(params.levelId);
    if (lvl >= 1 && lvl <= 3) {
      questions = LEVEL_QUESTIONS[lvl] ?? [];
      quizTitle = `${t("Level")} ${lvl} ${t("Quiz")}`;
      currentLevel = lvl;
    }
  } else if (level) {
    if (level >= 1 && level <= 3) {
      questions = LEVEL_QUESTIONS[level] ?? [];
      quizTitle = `${t("Level")} ${level} ${t("Quiz")}`;
      currentLevel = level;
    }
  } else {
    questions = PRACTICE_QUESTIONS;
  }

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const confettiRef = useRef<HTMLDivElement>(null);

  // Reset correctCount when level or questions change
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    setCorrectCount(0);
    setSelected(null);
    setFeedback(null);
    setCurrent(0);
  }, [currentLevel, questions.length]);

  const question = questions[current];

  const CONFETTI_COUNT = 40;
  const CONFETTI_COLORS = ["#1e40af", "#2563eb", "#a5c9ff", "#d0e6ff"];

  function createConfettiAroundBox(box: DOMRect) {
    if (!confettiRef.current) return;
    confettiRef.current.innerHTML = "";

    for (let i = 0; i < CONFETTI_COUNT; i++) {
      const particle = document.createElement("div");
      particle.className = "confetti-particle";
      particle.style.backgroundColor = CONFETTI_COLORS[i % CONFETTI_COLORS.length];

      const perimeter = 2 * (box.width + box.height);
      const pos = (perimeter / CONFETTI_COUNT) * i;

      let x = 0;
      let y = 0;

      if (pos < box.width) {
        x = box.left + pos;
        y = box.top;
      } else if (pos < box.width + box.height) {
        x = box.left + box.width;
        y = box.top + (pos - box.width);
      } else if (pos < 2 * box.width + box.height) {
        x = box.left + (2 * box.width + box.height - pos);
        y = box.top + box.height;
      } else {
        x = box.left;
        y = box.top + (perimeter - pos);
      }

      x += (Math.random() - 0.5) * 8;
      y += (Math.random() - 0.5) * 8;

      particle.style.position = "fixed";
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;

      const size = Math.random() * 4 + 2;
      particle.style.width = particle.style.height = `${size}px`;

      particle.style.animationDelay = `${Math.random() * 300}ms`;

      confettiRef.current.appendChild(particle);
    }
  }

  function triggerConfetti(box: DOMRect) {
    if (!confettiRef.current) return;
    confettiRef.current.classList.add("confetti-active");
    createConfettiAroundBox(box);

    setTimeout(() => {
      if (confettiRef.current) {
        confettiRef.current.classList.remove("confetti-active");
        confettiRef.current.innerHTML = "";
      }
    }, 1500);
  }

  // Load sounds once
  const successSound = useRef<HTMLAudioElement | null>(null);
  const failSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    successSound.current = new Audio("/sounds/correct.mp3");
    failSound.current = new Audio("/sounds/incorrect.mp3");
  }, []);

  function playSuccessSound() {
    if (successSound.current) {
      successSound.current.currentTime = 0;
      successSound.current.play().catch(() => {});
    }
  }

  function playFailSound() {
    if (failSound.current) {
      failSound.current.currentTime = 0;
      failSound.current.play().catch(() => {});
    }
  }

  function handleAnswer(index: number, event: React.MouseEvent<HTMLButtonElement>) {
    if (selected !== null) return;
    setSelected(index);
    const isCorrect = index === question.correctIndex;
    setFeedback(isCorrect ? "correct" : "wrong");

    if (isCorrect) {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      triggerConfetti(rect);
      playSuccessSound();
    } else {
      playFailSound();
    }

    setTimeout(() => {
      setSelected(null);
      setFeedback(null);
      if (current + 1 < questions.length) {
        setCurrent(current + 1);
        if (isCorrect) {
          setCorrectCount((c) => c + 1);
        }
      } else {
        const finalScore = isCorrect ? correctCount + 1 : correctCount;
        // Calculate green lights
        const greenLights = calculateGreenLights(finalScore, questions.length);
        if (currentLevel > 0) {
          setBestResult(currentLevel, greenLights);
        }
        navigate("/level/result", {
          state: { score: finalScore, total: questions.length },
        });
      }
    }, 1000);
  }

  // Traffic light display logic for quiz level view
  // Show traffic light only in level quiz (not practice) and only in header top-right
  // Size reduced and positioned absolutely in header

  // For quiz traffic light, show based on current correctCount
  // If no questions answered yet (correctCount=0 and current=0), show red only (??)

  // Compose class names for lights
  // Classes:
  // .light.red, .light.yellow, .light.green
  // on/off
  // color modifiers: green-bonus for green coloring on red/yellow

  // Determine light state for quiz traffic light
  interface LightState {
    redOn: boolean;
    yellowOn: boolean;
    greenOn: boolean;
    redIsGreen: boolean;
    yellowIsGreen: boolean;
  }

  let lightState: LightState = {
    redOn: false,
    yellowOn: false,
    greenOn: false,
    redIsGreen: false,
    yellowIsGreen: false,
  };

  const isLevelQuiz = mode !== "practice" && currentLevel >= 1 && currentLevel <= 3 && questions.length === 10;

  if (isLevelQuiz) {
    // Determine initial light state based on currentLevel and progress
    // For level 1:
    //   Before playing: show only red
    // For level > 1:
    //   If previous level not passed (best result < 1 green): show lock (no traffic light)
    //   If unlocked but not played: show only red
    //   After playing: show traffic light based on saved score

    // Get saved best result for current level
    const savedGreenLights = getBestResult(currentLevel);

    // Determine if previous level passed (for levels > 1)
    const prevLevelPassed = currentLevel === 1 ? true : getBestResult(currentLevel - 1) >= 1;

    if (currentLevel === 1) {
      // Level 1: before playing show only red
      if (correctCount === 0 && current === 0) {
        lightState = {
          redOn: true,
          yellowOn: false,
          greenOn: false,
          redIsGreen: false,
          yellowIsGreen: false,
        };
      } else {
        // Show traffic light based on correctCount
        if (correctCount >= 0 && correctCount <= 4) {
          lightState = {
            redOn: true,
            yellowOn: false,
            greenOn: false,
            redIsGreen: false,
            yellowIsGreen: false,
          };
        } else if (correctCount >= 5 && correctCount <= 7) {
          lightState = {
            redOn: false,
            yellowOn: true,
            greenOn: false,
            redIsGreen: false,
            yellowIsGreen: false,
          };
        } else if (correctCount === 8) {
          lightState = {
            redOn: false,
            yellowOn: false,
            greenOn: true,
            redIsGreen: false,
            yellowIsGreen: false,
          };
        } else if (correctCount === 9) {
          lightState = {
            redOn: false,
            yellowOn: true,
            greenOn: true,
            redIsGreen: false,
            yellowIsGreen: true,
          };
        } else if (correctCount === 10) {
          lightState = {
            redOn: true,
            yellowOn: true,
            greenOn: true,
            redIsGreen: true,
            yellowIsGreen: true,
          };
        }
      }
    } else {
      // Levels > 1
      if (!prevLevelPassed) {
        // Previous level not passed: show no traffic light (lock handled in Play.tsx)
        lightState = {
          redOn: false,
          yellowOn: false,
          greenOn: false,
          redIsGreen: false,
          yellowIsGreen: false,
        };
      } else {
        // Unlocked
        if (savedGreenLights === 0) {
          // Not played yet: show only red
          lightState = {
            redOn: true,
            yellowOn: false,
            greenOn: false,
            redIsGreen: false,
            yellowIsGreen: false,
          };
        } else {
          // Played: show traffic light based on savedGreenLights
          switch (savedGreenLights) {
            case 1:
              lightState = {
                redOn: false,
                yellowOn: false,
                greenOn: true,
                redIsGreen: false,
                yellowIsGreen: false,
              };
              break;
            case 2:
              lightState = {
                redOn: false,
                yellowOn: true,
                greenOn: true,
                redIsGreen: false,
                yellowIsGreen: true,
              };
              break;
            case 3:
              lightState = {
                redOn: true,
                yellowOn: true,
                greenOn: true,
                redIsGreen: true,
                yellowIsGreen: true,
              };
              break;
            default:
              // fallback to red only
              lightState = {
                redOn: true,
                yellowOn: false,
                greenOn: false,
                redIsGreen: false,
                yellowIsGreen: false,
              };
              break;
          }
        }
      }
    }
  }

  if (!question) {
    return <div className="card">{t("No questions available.")}</div>;
  }

  const redClass = ["light", "red", lightState.redOn ? "on" : "off"];
  if (lightState.redIsGreen) {
    redClass.push("green-bonus");
  }

  const yellowClass = ["light", "yellow", lightState.yellowOn ? "on" : "off"];
  if (lightState.yellowIsGreen) {
    yellowClass.push("green-bonus");
  }

  const greenClass = ["light", "green", lightState.greenOn ? "on" : "off"];

  return (
    <div className="card quiz-card level-card" style={{ position: "relative", paddingBottom: "72px" }}>
      <h2 style={{ position: "relative" }}>{quizTitle}
        {isLevelQuiz && (lightState.redOn || lightState.yellowOn || lightState.greenOn) && (
          <div
            className="traffic-light"
            aria-label="Progress traffic light indicator"
            style={{ position: "absolute", top: 0, right: 0 }}
          >
            <div className={redClass.join(" ")} aria-hidden="true" />
            <div className={yellowClass.join(" ")} aria-hidden="true" />
            <div className={greenClass.join(" ")} aria-hidden="true" />
          </div>
        )}
      </h2>

      <div className="question">
        <h3>{question.text[language]}</h3>
      </div>

      <div className="answers">
        {question.answers[language].map((answer, index) => {
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

      <div ref={confettiRef} className="confetti-container" aria-hidden="true" />
    </div>
  );
}
