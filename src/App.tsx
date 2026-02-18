import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AppShell from "./AppShell";
import Login from "./Login";

import AdminDashboard from "./admin/AdminDashboard";
import QuizList from "./admin/QuizList";
import QuizEditor from "./admin/QuizEditor";
import EditQuiz from "./admin/EditQuiz";

import StudentQuiz from "./student/StudentQuiz";

import Level1 from "./student/Level1";
import LevelResult from "./student/LevelResult";

const API_URL = import.meta.env.VITE_API_URL;

export default function App() {
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
        <Route
          path="/"
          element={
            <div className="card">
              <h2>Velkommen 👋</h2>

             <div className="menu-grid">
  <div
    className="menu-card"
    onClick={() => (location.href = "/level/1")}
  >
    <div className="menu-icon">🎮</div>
    <div>
      <h3>Level 1</h3>
      <p>Høyt tempo – tjen poeng!</p>
    </div>
  </div>

  <div
    className="menu-card"
    onClick={() => (location.href = "/quiz")}
  >
    <div className="menu-icon">📘</div>
    <div>
      <h3>Klassisk Quiz</h3>
      <p>Uten tidspress</p>
    </div>
  </div>
</div>

            </div>
          }
        />

        <Route path="/level/1" element={<Level1 />} />
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

