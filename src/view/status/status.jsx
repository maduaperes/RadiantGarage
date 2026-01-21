import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/status.css";
import logo from "../../assets/IMG/logo.png";

export default function Status() {
  const navigate = useNavigate();

  const [statusText, setStatusText] = useState("");
  const [eta, setEta] = useState("");

  useEffect(() => {
    const current = JSON.parse(localStorage.getItem("lj_current") || "null");

    if (!current) {
      setStatusText("Nenhum serviço agendado. Faça um agendamento.");
      setEta("");
      return;
    }

    const stages = ["agendado", "em andamento", "finalizando", "finalizado"];
    let i = stages.indexOf(current.status || "agendado");
    let minutesLeft = 30;

    setStatusText(`Status: ${stages[i]}`);
    setEta(`Estimativa: ~${minutesLeft} minutos`);

    const interval = setInterval(() => {
      if (i < stages.length - 1) {
        i++;
        current.status = stages[i];
        localStorage.setItem("lj_current", JSON.stringify(current));

        setStatusText(`Status: ${stages[i]}`);
        minutesLeft -= 10;

        setEta(
          minutesLeft > 0
            ? `Estimativa: ~${minutesLeft} minutos`
            : "Finalizando..."
        );
      }

      if (i >= stages.length - 1) {
        clearInterval(interval);
        setEta("Concluído.");
      }
    }, 8000); // mesmo tempo do JS original

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <header className="top">
        <img src={logo} className="mini" alt="logo" />
        <div className="user">👋 Olá, João</div>
      </header>

      <main className="card">
        <div className="back" onClick={() => navigate("/dashboard")}>
          ⇦
        </div>

        <h2>Status do Serviço</h2>

        <div className="status">{statusText}</div>
        <div className="eta">{eta}</div>

        <div className="actions">
          <button
            className="secondary"
            onClick={() => navigate("/dashboard")}
          >
            Voltar ao início
          </button>

          <button
            className="primary"
            onClick={() => navigate("/feedback")}
          >
            Avaliar
          </button>
        </div>
      </main>
    </>
  );
}
