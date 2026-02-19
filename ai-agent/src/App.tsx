import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Level1 from './student/Level1';
import StudentQuiz from './student/StudentQuiz';
import MainMenu from './student/MainMenu';
import Play from './student/Play';
import Practice from './student/Practice';
import Profile from './student/Profile';
import Leaderboards from './student/Leaderboards';

// Assuming there are other admin routes and imports here

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Student routes */}
        <Route path="/" element={<MainMenu />} />
        <Route path="/play" element={<Play />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/leaderboards" element={<Leaderboards />} />
        <Route path="/level/1" element={<Level1 />} />
        <Route path="/student-quiz" element={<StudentQuiz />} />

        {/* Other routes (admin etc) should remain here unchanged */}
      </Routes>
    </Router>
  );
};

export default App;
