import { useState } from "react";
import "../../styles/profile.css";

export default function Profile() {
  const [userName, setUserName] = useState("João Silva");
  const [userEmail, setUserEmail] = useState("joao@email.com");

  const [editModal, setEditModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [vehicleModal, setVehicleModal] = useState(false);

  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [vehicles, setVehicles] = useState([
    { model: "Tesla Model 3", plate: "ABC-1234" },
  ]);

  const [history] = useState([
    {
      servico: "Lavagem Completa",
      data: "05/10/2025",
      preco: "R$ 60,00",
      status: "concluido",
    },
    {
      servico: "Polimento",
      data: "29/09/2025",
      preco: "R$ 120,00",
      status: "concluido",
    },
    {
      servico: "Higienização Interna",
      data: "15/09/2025",
      preco: "R$ 80,00",
      status: "concluido",
    },
  ]);

  function saveProfile() {
    if (editName) setUserName(editName);
    if (editEmail) setUserEmail(editEmail);
    setEditName("");
    setEditEmail("");
    setEditModal(false);
  }

  function savePassword() {
    if (newPassword.length < 6) {
      alert("A nova senha deve ter pelo menos 6 caracteres.");
      return;
    }
    alert("Senha alterada com sucesso!");
    setNewPassword("");
    setPasswordModal(false);
  }

  function addVehicle(model, plate) {
    setVehicles([...vehicles, { model, plate }]);
  }

  function logout() {
    if (confirm("Deseja realmente sair da conta?")) {
      window.location.href = "/login";
    }
  }

  return (
    <>
      <header className="header">
        <div className="logo">
          <div className="logo-icon"></div>
          <span>RadiantGarage</span>
        </div>
      </header>

      <main>
        <div className="profile-card">
          <div className="profile-header">
            <div className="avatar">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3736/3736502.png"
                alt="Perfil"
              />
            </div>

            <div className="user-info">
              <h2>{userName}</h2>
              <p>{userEmail}</p>

              <div style={{ display: "flex", gap: 10 }}>
                <button className="btn-primary" onClick={() => setEditModal(true)}>
                  Editar Perfil
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => setPasswordModal(true)}
                >
                  Senha
                </button>
              </div>
            </div>
          </div>

          <section className="vehicles-section">
            <h3>Meus Veículos</h3>

            <div className="history-list">
              {vehicles.map((v, i) => (
                <div className="history-item" key={i}>
                  <p>
                    <strong>{v.model}</strong> - {v.plate}
                  </p>
                  <span className="status concluido">Ativo</span>
                </div>
              ))}
            </div>

            <button
              className="btn-primary"
              onClick={() => setVehicleModal(true)}
            >
              + Adicionar Veículo
            </button>
          </section>

          <section className="history-section">
            <h3>Histórico de Serviços</h3>

            <div className="history-list">
              {history.map((item, i) => (
                <div className="history-item" key={i}>
                  <p>
                    <strong>{item.servico}</strong> - {item.data}
                  </p>
                  <p style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
                    Valor: {item.preco}
                  </p>
                  <span className={`status ${item.status}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              className="btn-secondary"
              onClick={() => (window.location.href = "/procura")}
            >
              Voltar
            </button>

            <button className="btn-danger" onClick={logout}>
              Sair da Conta
            </button>
          </div>
        </div>
      </main>

      {/* MODAL EDITAR PERFIL */}
      {editModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Editar Perfil</h3>
            <input
              placeholder="Novo nome"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
            <input
              placeholder="Novo email"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
            />
            <div className="modal-actions">
              <button className="btn-primary" onClick={saveProfile}>
                Salvar
              </button>
              <button
                className="btn-secondary"
                onClick={() => setEditModal(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL SENHA */}
      {passwordModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Alterar Senha</h3>
            <input
              type="password"
              placeholder="Nova senha"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <div className="modal-actions">
              <button className="btn-primary" onClick={savePassword}>
                Confirmar
              </button>
              <button
                className="btn-secondary"
                onClick={() => setPasswordModal(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL VEÍCULO */}
      {vehicleModal && (
        <div className="modal">
          <VehicleModal
            onSave={(m, p) => {
              addVehicle(m, p);
              setVehicleModal(false);
            }}
            onClose={() => setVehicleModal(false)}
          />
        </div>
      )}
    </>
  );
}

function VehicleModal({ onSave, onClose }) {
  const [model, setModel] = useState("");
  const [plate, setPlate] = useState("");

  return (
    <div className="modal-content">
      <h3>Adicionar Veículo</h3>
      <input
        placeholder="Modelo"
        value={model}
        onChange={(e) => setModel(e.target.value)}
      />
      <input
        placeholder="Placa"
        value={plate}
        onChange={(e) => setPlate(e.target.value)}
      />
      <div className="modal-actions">
        <button
          className="btn-primary"
          onClick={() => {
            if (!model || !plate) return alert("Preencha todos os campos.");
            onSave(model, plate);
          }}
        >
          Adicionar
        </button>
        <button className="btn-secondary" onClick={onClose}>
          Cancelar
        </button>
      </div>
    </div>
  );
}
