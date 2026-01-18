import { useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import "../../styles/dashboard.css";

ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function DashboardView() {
  // =========================
  // ESTADOS
  // =========================
  const [dados, setDados] = useState({
    servicos: [
      "Manutenção do Motor",
      "Combustão e Injeção",
      "Lavagem Simples/ Completa",
      "Diagnóstico e Revisão Geral",
      "Ar e Climatização",
      "Polimento"
    ],
    clientes: [
      "João Silva",
      "Maria Souza",
      "Carlos Oliveira",
      "Ana Pereira"
    ],
    agendamentos: [
      "05/10 - João Silva - Troca de óleo",
      "06/10 - Maria Souza - Revisão completa",
      "07/10 - Carlos Oliveira - Alinhamento"
    ]
  });

  const [modalAberto, setModalAberto] = useState(false);
  const [tipoLista, setTipoLista] = useState("");
  const [editando, setEditando] = useState(false);

  // =========================
  // GRÁFICOS
  // =========================
  const performanceData = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out"],
    datasets: [
      {
        label: "Serviços Concluídos",
        data: [20, 25, 30, 28, 35, 40, 38, 45, 50, 47],
        backgroundColor: "#4f46e533",
        borderColor: "#4f46e5",
        tension: 0.3,
        fill: true
      }
    ]
  };

  const revenueData = {
    labels: ["Troca de óleo", "Revisão", "Alinhamento", "Balanceamento"],
    datasets: [
      {
        data: [1500, 2000, 1200, 1800],
        backgroundColor: "#4f46e5"
      }
    ]
  };

  // =========================
  // FUNÇÕES
  // =========================
  function abrirModal(tipo) {
    setTipoLista(tipo);
    setEditando(false);
    setModalAberto(true);
  }

  function salvarLista() {
    setEditando(false);
  }

  function alterarItem(valor, index) {
    setDados(prev => ({
      ...prev,
      [tipoLista]: prev[tipoLista].map((item, i) =>
        i === index ? valor : item
      )
    }));
  }

  // =========================
  // JSX
  // =========================
  return (
    <main className="dashboard">
      {/* VISÃO GERAL */}
      <section className="overview">
        <h2>Visão Geral</h2>
        <div className="overview-cards">
          <div className="card"><h3>Total de Serviços</h3><p>45</p></div>
          <div className="card"><h3>Clientes Ativos</h3><p>30</p></div>
          <div className="card"><h3>Agendamentos Hoje</h3><p>7</p></div>
          <div className="card"><h3>Receita Mensal</h3><p>R$ 12.500</p></div>
        </div>
      </section>

      {/* LISTAS */}
      <section className="cards-grid">
        <div className="card">
          <h3>Serviços Disponíveis</h3>
          <ul>
            {dados.servicos.slice(0, 4).map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
          <button className="btn-primary" onClick={() => abrirModal("servicos")}>
            Ver todos
          </button>
        </div>

        <div className="card">
          <h3>Clientes Recentes</h3>
          <ul>
            {dados.clientes.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
          <button className="btn-primary" onClick={() => abrirModal("clientes")}>
            Ver todos
          </button>
        </div>

        <div className="card">
          <h3>Agendamentos Pendentes</h3>
          <ul>
            {dados.agendamentos.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
          <button
            className="btn-primary"
            onClick={() => abrirModal("agendamentos")}
          >
            Ver todos
          </button>
        </div>
      </section>

      {/* GRÁFICOS */}
      <section className="charts">
        <div className="chart-section">
          <h2>Desempenho Mensal</h2>
          <Line data={performanceData} />
        </div>

        <div className="chart-section">
          <h2>Receita por Serviço</h2>
          <Bar data={revenueData} />
        </div>
      </section>

      {/* MODAL */}
      {modalAberto && (
        <div className="modal">
          <div className="modal-content">
            <h3>{tipoLista.toUpperCase()}</h3>

            {dados[tipoLista].map((item, i) => (
              <div key={i}>
                {editando ? (
                  <input
                    value={item}
                    onChange={e => alterarItem(e.target.value, i)}
                  />
                ) : (
                  <p>{item}</p>
                )}
              </div>
            ))}

            <div className="modal-actions">
              <button
                className="btn-primary"
                onClick={() =>
                  editando ? salvarLista() : setEditando(true)
                }
              >
                {editando ? "Salvar" : "Editar"}
              </button>
              <button
                className="btn-secondary"
                onClick={() => setModalAberto(false)}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
