import { useState } from "react";
import "../../styles/Login.css";

export default function LoginView() {
  // =========================
  // ESTADOS
  // =========================
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [feedback, setFeedback] = useState("");

  // =========================
  // USUÁRIOS TESTE
  // =========================
  const usuariosTeste = [
    { tipo: "admin", email: "...", senha: "..." },
    { tipo: "cliente", email: "***", senha: "***" }
  ];

  // =========================
  // HANDLER
  // =========================
  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !senha) {
      setFeedback("Preencha email e senha.");
      return;
    }

    const usuario = usuariosTeste.find(
      u => u.email === email && u.senha === senha
    );

    if (!usuario) {
      setFeedback("Email ou senha incorretos.");
      return;
    }

    setFeedback(`Entrando como ${usuario.tipo}...`);

    localStorage.setItem(
      "lj_user",
      JSON.stringify({ name: usuario.tipo, contact: email })
    );

    setTimeout(() => {
      if (usuario.tipo === "admin") {
        window.location.href = "/dashboard";
      } else {
        window.location.href = "/agendamento";
      }
    }, 1500);
  }

  // =========================
  // JSX
  // =========================
  return (
    <main className="login-container">
      <div className="login-card">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Digite seu email"
          />

          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            placeholder="Digite sua senha"
          />

          <button type="submit" className="primary">
            Entrar
          </button>

          {feedback && (
            <p
              style={{
                marginTop: 10,
                textAlign: "center",
                color: "red",
                fontWeight: 600
              }}
            >
              {feedback}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
