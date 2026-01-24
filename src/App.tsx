import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AppShell from "./AppShell";
import Login from "./Login";
import AdminDashboard from "./admin/AdminDashboard";
import QuizList from "./admin/QuizList";
import QuizEditor from "./admin/QuizEditor";
import EditQuiz from "./admin/EditQuiz";

export default function App() {
console.log("API URL:", import.meta.env.VITE_API_URL);  
const [user, setUser] = useState<any>(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    fetch("https://web-app-backend.husevik.workers.dev/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => setUser(d.user));
  }, [token]);

  if (!token) return <Login onLogin={setUser} />;
  if (!user) return <div className="loading">Laster…</div>;

  const isAdmin = user.email === "admin@example.com";

  return (
    <AppShell user={user} isAdmin={isAdmin}>
      <Routes>
        <Route path="/" element={<Home />} />

        {isAdmin && (
          <>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/quizzes" element={<QuizList />} />
            <Route path="/admin/quiz/new" element={<QuizEditor />} />
            <Route path="/admin/quiz/edit/:id" element={<EditQuiz />} />
          </>
        )}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AppShell>
  );
}

function Home() {
  return (
    <div className="card">
      <h2>Velkommen 👋</h2>
      <p>Dette blir læringsreisen din.</p>
    </div>
  );
}
