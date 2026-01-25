import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AppShell from "./AppShell";
import Login from "./Login";

import AdminDashboard from "./admin/AdminDashboard";
import QuizList from "./admin/QuizList";
import QuizEditor from "./admin/QuizEditor";
import EditQuiz from "./admin/EditQuiz";

import StudentQuiz from "./student/StudentQuiz";
import QuizResult from "./student/QuizResult";

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
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.ok) setUser(data.user);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="loading">Laster…</div>;
  }

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  const isAdmin = user.email === "admin@example.com";

  return (
    <AppShell user={user} isAdmin={isAdmin}>
      <Routes>
        {/* Student */}
        <Route path="/" element={<StudentQuiz />} />
        <Route
          path="/quiz/result"
          element={<QuizResult score={0} total={0} />}
        />

        {/* Admin */}
        {isAdmin && (
          <>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/quizzes" element={<QuizList />} />
            <Route path="/admin/quizzes/new" element={<QuizEditor />} />
            <Route path="/admin/quizzes/:id" element={<EditQuiz />} />
          </>
        )}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AppShell>
  );
}
