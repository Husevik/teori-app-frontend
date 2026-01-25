import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

type Props = {
  onLogin: (user: { email: string }) => void;
};

export default function Login({ onLogin }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError("Feil e-post eller passord");
        return;
      }

      localStorage.setItem("token", data.token);
      onLogin({ email: data.email });
    } catch {
      setError("Kunne ikke koble til server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Logg inn</h2>

        {error && <p className="error">{error}</p>}

        <input
          type="email"
          placeholder="E-post"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Passord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Logger inn…" : "Logg inn"}
        </button>
      </div>
    </div>
  );
}
