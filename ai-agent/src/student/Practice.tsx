import React from 'react';
import { useNavigate } from 'react-router-dom';
import StudentQuiz from './StudentQuiz';
import './Practice.css';

const Practice: React.FC = () => {
  const navigate = useNavigate();
  const [startQuiz, setStartQuiz] = React.useState(false);

  if (startQuiz) {
    return <StudentQuiz />;
  }

  return (
    <div className="practice-container">
      <h1>Practice</h1>
      <p>Ready to practice your skills? Start the quiz below.</p>
      <button
        className="menu-card practice-start-button"
        onClick={() => setStartQuiz(true)}
      >
        Start Quiz
      </button>
    </div>
  );
};

export default Practice;
