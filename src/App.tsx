import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AppShell from "./AppShell";
import Login from "./Login";

// Admin
import AdminDashboard from "./admin/AdminDashboard";
import QuizList from "./admin/QuizList";
import QuizEditor from "./admin/QuizEditor";
import EditQuiz from "./admin/EditQuiz";

// Student
import StudentQuiz from "./student/StudentQuiz";

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

  if (loading) return <div className="loading">Laster…</div>;

  if (!user) return <Login onLogin={setUser} />;

  return (
    <AppShell
      user={user}
      onLogout={() => setUser(null)}
    >
      <Routes>
        {/* 🏠 HJEM */}
        <Route
          path="/"
          element={
            <div className="card">
              <h2>Velkommen 👋</h2>
              <p>
                Velg quiz for å starte øving, eller fortsett der du slapp.
              </p>
            </div>
          }
        />

        {/* 🎓 STUDENT */}
        <Route path="/quiz" element={<StudentQuiz />} />

        {/* 🛠 ADMIN */}
        {user.isAdmin && (
          <>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/quizzes" element={<QuizList />} />
            <Route path="/admin/quizzes/new" element={<QuizEditor />} />
            <Route path="/admin/quizzes/:id" element={<EditQuiz />} />
          </>
        )}

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AppShell>
  );
}
