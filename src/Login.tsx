import { useState } from "react";

type Props = {
  onLogin: (user: { email: string }) => void;
};

export default function Login({ onLogin }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(
        "https://web-app-backend.husevik.workers.dev/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Innlogging feilet");
      }

      // store token
      localStorage.setItem("token", data.token);

      // notify app
      onLogin({ email: data.email });
    } catch (err: any) {
      setError(err.message || "Noe gikk galt");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app-bg">
      <div className="login-card">
        <h2>Logg inn</h2>

        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="E-post"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Passord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Logger inn…" : "Logg inn"}
          </button>

          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
}
