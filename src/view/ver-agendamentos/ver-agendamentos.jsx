import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/ver-agendamentos.css";

export default function Agendamento() {
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const historyData = JSON.parse(
      localStorage.getItem("lj_history") || "[]"
    );
    const servicesData = JSON.parse(
      localStorage.getItem("lj_services") || "[]"
    );

    setHistory(historyData);
    setServices(servicesData);
  }, []);

  function getServiceName(serviceId) {
    const service = services.find(s => s.id == serviceId);
    return service ? service.name : "Desconhecido";
  }

  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="logo">
          <div className="logo-icon"></div>
          <span>RadiantGarage</span>
        </div>

        <nav className="nav">
          <a onClick={() => navigate("/dashboard")}>Dashboard</a>
          <span>|</span>
          <a onClick={() => navigate("/novo-servico")}>Novo Serviço</a>
          <span>|</span>
          <a onClick={() => navigate("/novo-cliente")}>Novo Cliente</a>
          <span>|</span>
          <a onClick={() => navigate("/relatorios")}>Ver Relatórios</a>
        </nav>

        <div className="user">
          <a onClick={() => navigate("/login")}>Login</a>
        </div>
      </header>

      <main className="main-content">
        <div className="card">
          <div className="back" onClick={() => navigate("/dashboard")}>
            ↩
          </div>

          <h2>Agendamentos</h2>
          <p className="subtitle">Veja os agendamentos realizados</p>

          <table>
            <thead>
              <tr>
                <th>Serviço</th>
                <th>Data</th>
                <th>Hora</th>
                <th>Pagamento</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {history.length === 0 ? (
                <tr>
                  <td colSpan="5">Nenhum agendamento encontrado</td>
                </tr>
              ) : (
                history.map((item, index) => (
                  <tr key={index}>
                    <td>{getServiceName(item.serviceId)}</td>
                    <td>{item.date}</td>
                    <td>{item.time}</td>
                    <td>{item.payment}</td>
                    <td>{item.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
