import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Play.css";

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

interface Level {
  id: number;
  label: string;
  enabled: boolean;
}

export default function Play() {
  const navigate = useNavigate();

  const [levels, setLevels] = useState<Level[]>([
    { id: 1, label: "Level 1", enabled: true },
    { id: 2, label: "Level 2", enabled: false },
    { id: 3, label: "Level 3", enabled: false },
  ]);

  // Load best results from localStorage and update levels accordingly
  const [bestResults, setBestResults] = useState<Record<number, number>>({});

  useEffect(() => {
    const results: Record<number, number> = {};
    levels.forEach((level) => {
      results[level.id] = getBestResult(level.id);
    });

    // Determine which levels are enabled based on unlock rule
    // Level 1 always enabled
    // Level N enabled if previous level has at least 1 green (correctCount >= 8)
    const newLevels = levels.map((level) => {
      if (level.id === 1) {
        return { ...level, enabled: true };
      }
      const prevGreenLights = results[level.id - 1] ?? 0;
      // Unlock if previous level has at least 1 green light
      const unlocked = prevGreenLights >= 1;
      return { ...level, enabled: unlocked };
    });

    setLevels(newLevels);
    setBestResults(results);
  }, []);

  // Helper to render traffic light or lock or red only
  function renderTrafficLight(levelId: number, enabled: boolean, greenLights: number) {
    // Locked level: show lock icon (??)
    if (!enabled && levelId !== 1) {
      return <div className="level-lock" aria-label="Level locked" title="Level locked">🔒</div>;
    }

    // Level 1 or unlocked but not played (greenLights === 0): show red only
    if (greenLights === 0) {
      return (
        <div className="traffic-light-level" aria-label="Level not played">
          <div className="light red on" aria-hidden="true" />
          <div className="light yellow off" aria-hidden="true" />
          <div className="light green off" aria-hidden="true" />
        </div>
      );
    }

    // Played level: show traffic light based on greenLights
    // greenLights: 1-3
    const redOn = false;
    const yellowOn = greenLights >= 2;
    const greenOn = greenLights >= 1;

    const redClass = ["light", "red", redOn ? "on" : "off"];
    if (greenLights === 3) {
      redClass.push("green-bonus");
    }

    const yellowClass = ["light", "yellow", yellowOn ? "on" : "off"];
    if (greenLights >= 2) {
      yellowClass.push("green-bonus");
    }

    const greenClass = ["light", "green", greenOn ? "on" : "off"];

    return (
      <div className="traffic-light-level" aria-label={`Level score: ${greenLights} green lights`}> 
        <div className={redClass.join(" ")} aria-hidden="true" />
        <div className={yellowClass.join(" ")} aria-hidden="true" />
        <div className={greenClass.join(" ")} aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className="student-page">
      <div className="student-container">
        <div className="card">
          <h2 className="play-header">Play Levels</h2>
          <div className="student-levels-grid">
            {levels.map(({ id, label, enabled }) => {
              const greenLights = bestResults[id] ?? 0;

              return (
                <button
                  key={id}
                  className="student-level-card"
                  onClick={() => enabled && navigate(`/level/${id}`)}
                  disabled={!enabled}
                  type="button"
                  aria-disabled={!enabled}
                  aria-label={enabled ? `Play ${label}` : `${label} locked`}
                >
                  <h3>{label}</h3>
                  {renderTrafficLight(id, enabled, greenLights)}
                </button>
              );
            })}
          </div>
          <div className="student-back-button-container">
            <button
              className="student-back-button"
              onClick={() => navigate("/")}
              type="button"
            >
              ⬅ Back to Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
