import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

type Props = {
  onLogin: (user: any) => void;
};

export default function Login({ onLogin }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(
        `${API_URL}/auth/${isRegister ? "register" : "login"}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Noe gikk galt");
      }

      // Login gir token, register gjør ikke
      if (data.token) {
        localStorage.setItem("token", data.token);
        onLogin({ email: data.email });
      } else {
        // Etter register → logg inn automatisk
        setIsRegister(false);
        setError("Bruker opprettet! Logg inn 👇");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-card">
      <h2>{isRegister ? "Registrer bruker" : "Logg inn"}</h2>

      <form className="login-form" onSubmit={handleSubmit}>
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
          {loading
            ? "Venter…"
            : isRegister
            ? "Opprett konto"
            : "Logg inn"}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      <div style={{ marginTop: 12 }}>
        <button
          style={{
            background: "none",
            border: "none",
            color: "#3fa9c9",
            cursor: "pointer",
            fontSize: 14,
          }}
          onClick={() => {
            setError(null);
            setIsRegister(!isRegister);
          }}
        >
          {isRegister
            ? "Har du konto? Logg inn"
            : "Ingen konto? Registrer deg"}
        </button>
      </div>
    </div>
  );
}
