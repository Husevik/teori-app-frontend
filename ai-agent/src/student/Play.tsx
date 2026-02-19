import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Play.css';

const levels = [
  { id: 1, label: 'Level 1', route: '/level/1', disabled: false },
  { id: 2, label: 'Level 2', route: '', disabled: true },
  { id: 3, label: 'Level 3', route: '', disabled: true },
];

const Play: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="play-container">
      <h1>Play Levels</h1>
      <div className="levels-grid">
        {levels.map(({ id, label, route, disabled }) => (
          <button
            key={id}
            className={`menu-card play-level-card ${disabled ? 'disabled' : ''}`}
            onClick={() => !disabled && route && navigate(route)}
            disabled={disabled}
            aria-disabled={disabled}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Play;
