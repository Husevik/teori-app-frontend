import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

type Props = {
  onLogin: (user: any) => void;
};

export default function Login({ onLogin }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const endpoint = isRegister ? "/auth/register" : "/auth/login";

    const res = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Noe gikk galt");
      return;
    }

    if (data.token) {
      localStorage.setItem("token", data.token);
      onLogin({ email: data.email });
    } else {
      // register → gå automatisk til login
      setIsRegister(false);
    }
  }

  return (
    <div className="app-bg">
      <div className="login-card">
        <h2>{isRegister ? "Opprett konto" : "Logg inn"}</h2>

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

          {error && <div className="error">{error}</div>}

          <button type="submit">
            {isRegister ? "Registrer" : "Logg inn"}
          </button>
        </form>

        <p style={{ marginTop: 16 }}>
          {isRegister ? (
            <>
              Har du allerede konto?{" "}
              <button
                className="link"
                onClick={() => setIsRegister(false)}
              >
                Logg inn
              </button>
            </>
          ) : (
            <>
              Ingen konto?{" "}
              <button
                className="link"
                onClick={() => setIsRegister(true)}
              >
                Registrer deg
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
