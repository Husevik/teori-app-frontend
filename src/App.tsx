import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AppShell from "./AppShell";
import Login from "./Login";

import AdminDashboard from "./admin/AdminDashboard";
import QuizList from "./admin/QuizList";
import QuizEditor from "./admin/QuizEditor";
import EditQuiz from "./admin/EditQuiz";

const API_URL = import.meta.env.VITE_API_URL;

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  // 🔹 Sjekk om bruker allerede er logget inn
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

  if (loading) {
    return <div className="loading">Laster…</div>;
  }

  // 🔐 Ikke innlogget → kun login
  if (!user) {
    return <Login onLogin={setUser} />;
  }

  // ✅ Innlogget → AppShell + routing
  return (
    <AppShell user={user} onLogout={() => {
      localStorage.removeItem("token");
      setUser(null);
    }}>
      <Routes>
        {/* Student / hjem */}
        <Route
          path="/"
          element={
            <div className="card">
              <h2>Velkommen 👋</h2>
              <p>
                Dette blir læringsreisen din – quiz, progresjon og mestring.
              </p>
            </div>
          }
        />

        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/quizzes" element={<QuizList />} />
        <Route path="/admin/quizzes/new" element={<QuizEditor />} />
        <Route path="/admin/quizzes/:id" element={<EditQuiz />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AppShell>
  );
}
