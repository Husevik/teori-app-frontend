import React from 'react';
import './Leaderboards.css';

interface LeaderboardEntry {
  id: number;
  name: string;
  score: number;
  time: string;
}

const mockData: LeaderboardEntry[] = [
  { id: 1, name: 'Alice', score: 9800, time: '12:34' },
  { id: 2, name: 'Bob', score: 8700, time: '14:20' },
  { id: 3, name: 'Charlie', score: 7600, time: '15:10' },
  { id: 4, name: 'Diana', score: 7200, time: '16:05' },
  { id: 5, name: 'Eve', score: 6900, time: '17:45' },
];

const Leaderboards: React.FC = () => {
  return (
    <div className="leaderboards-container">
      <h1>Leaderboards</h1>
      <table className="leaderboards-table" aria-label="Leaderboard">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {mockData.map(({ id, name, score, time }, index) => (
            <tr key={id}>
              <td>{index + 1}</td>
              <td>{name}</td>
              <td>{score.toLocaleString()}</td>
              <td>{time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboards;
