import { useEffect } from "react";
import Chart from "chart.js/auto";
import "../../styles/dashboard.css";

export default function Dashboard() {
  useEffect(() => {
    // Gráfico de Desempenho
    const performance = document.getElementById("performanceChart");
    if (performance) {
      new Chart(performance, {
        type: "line",
        data: {
          labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out"],
          datasets: [
            {
              label: "Serviços Concluídos",
              data: [20, 25, 30, 28, 35, 40, 38, 45, 50, 47],
              backgroundColor: "#4f46e533",
              borderColor: "#4f46e5",
              tension: 0.3,
              fill: true,
            },
          ],
        },
      });
    }

    // Gráfico Receita
    const revenue = document.getElementById("revenueChart");
    if (revenue) {
      new Chart(revenue, {
        type: "bar",
        data: {
          labels: [
            "Troca de óleo",
            "Revisão completa",
            "Alinhamento",
            "Balanceamento",
          ],
          datasets: [
            {
              data: [1500, 2000, 1200, 1800],
              backgroundColor: "#4f46e5",
            },
          ],
        },
        options: {
          plugins: { legend: { display: false } },
        },
      });
    }
  }, []);

  return (
    <>
      {/* HEADER */}
      <header className="header">
        <div className="logo">
          <span>RadiantGarage</span>
        </div>

        <div className="search-box">
          <input placeholder="Pesquisar serviços" />
          <button>🔍︎</button>
        </div>

        <div className="right-group">
          <nav className="nav">
            <a href="/">Home</a>
            <span>|</span>
            <a href="/servicos">Serviços</a>
          </nav>
          <div className="user">
            <a href="/login">Login</a>
          </div>
        </div>
      </header>

      {/* DASHBOARD */}
      <main className="dashboard">
        <section className="overview">
          <h2>Visão Geral</h2>
          <div className="overview-cards">
            <div className="card"><h3>Total de Serviços</h3><p>45</p></div>
            <div className="card"><h3>Clientes Ativos</h3><p>30</p></div>
            <div className="card"><h3>Agendamentos Hoje</h3><p>7</p></div>
            <div className="card"><h3>Receita Mensal</h3><p>R$ 12.500</p></div>
          </div>
        </section>

        <section className="charts">
          <div className="chart-cards">
            <div className="chart-section">
              <h2>Desempenho Mensal</h2>
              <canvas id="performanceChart"></canvas>
            </div>

            <div className="chart-section">
              <h2>Receita por Serviço</h2>
              <canvas id="revenueChart"></canvas>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <p>© 2025 RadiantGarage</p>
      </footer>
    </>
  );
}
