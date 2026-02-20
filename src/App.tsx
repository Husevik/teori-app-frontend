import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AppShell from "./AppShell";
import Login from "./Login";

import AdminDashboard from "./admin/AdminDashboard";
import QuizList from "./admin/QuizList";
import QuizEditor from "./admin/QuizEditor";
import EditQuiz from "./admin/EditQuiz";

import StudentQuiz from "./student/StudentQuiz";
import MainMenu from "./student/MainMenu";
import Play from "./student/Play";
import Practice from "./student/Practice";
import Profile from "./student/Profile";
import Leaderboards from "./student/Leaderboards";

import LevelResult from "./student/LevelResult";

import { LanguageProvider } from "./locales/LanguageContext";

const API_URL = import.meta.env.VITE_API_URL;

function AppContent() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    fetch(`${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.ok) setUser(data.user);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Laster…</div>;
  if (!user) return <Login onLogin={setUser} />;

  return (
    <AppShell user={user} isAdmin={false}>
      <Routes>
        <Route path="/" element={<MainMenu />} />

        <Route path="/play" element={<Play />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/leaderboards" element={<Leaderboards />} />

        <Route path="/level/:levelId" element={<StudentQuiz />} />
        <Route path="/level/result" element={<LevelResult />} />

        <Route path="/quiz" element={<StudentQuiz />} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/quizzes" element={<QuizList />} />
        <Route path="/admin/quizzes/new" element={<QuizEditor />} />
        <Route path="/admin/quizzes/:id" element={<EditQuiz />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AppShell>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
