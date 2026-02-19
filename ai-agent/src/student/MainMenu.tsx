import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainMenu.css';

const menuItems = [
  { emoji: '🎮', label: 'Play', route: '/play' },
  { emoji: '📝', label: 'Practice', route: '/practice' },
  { emoji: '👤', label: 'Profile', route: '/profile' },
  { emoji: '🏆', label: 'Leaderboards', route: '/leaderboards' },
];

const MainMenu: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="main-menu-container">
      {menuItems.map(({ emoji, label, route }) => (
        <button
          key={label}
          className="menu-card main-menu-card"
          onClick={() => navigate(route)}
          aria-label={label}
        >
          <span className="emoji" aria-hidden="true">
            {emoji}
          </span>
          <span className="label">{label}</span>
        </button>
      ))}
    </div>
  );
};

export default MainMenu;
