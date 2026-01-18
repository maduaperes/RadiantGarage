import "../styles/novo-cliente.css";

export default function NovoClienteView({
  form,
  onChange,
  onSubmit,
  onBack
}) {
  return (
    <>
      <header className="header">
        <div className="logo">
          <div className="logo-icon"></div>
          <span>RadiantGarage</span>
        </div>

        <div className="search-box">
          <input type="text" placeholder="Pesquisar serviços" />
          <button type="button">🔍︎</button>
        </div>

        <div className="right-group">
          <nav className="nav">
            <a href="/">Home</a>
            <span>|</span>
            <a href="/procura">Serviços</a>
          </nav>

          <div className="user">
            <a href="/login">Login</a>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="card">
          <div className="back" onClick={onBack}>↩</div>

          <h2>Novo Cliente</h2>
          <p className="subtitle">
            Cadastre um novo cliente para agendar serviços.
          </p>

          <form className="form-grid" onSubmit={onSubmit}>
            <div className="column">
              <label>Nome Completo</label>
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                required
              />

              <label>Telefone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={onChange}
                required
              />

              <label>Email</label>
              <input
                name="email"
                value={form.email}
                onChange={onChange}
                required
              />

              <label>Data de Nascimento</label>
              <input
                type="date"
                name="birth"
                value={form.birth}
                onChange={onChange}
              />
            </div>

            <div className="column">
              <label>CPF</label>
              <input
                name="cpf"
                value={form.cpf}
                onChange={onChange}
              />

              <label>Endereço</label>
              <input
                name="address"
                value={form.address}
                onChange={onChange}
              />

              <label>Modelo do Veículo</label>
              <input
                name="car"
                value={form.car}
                onChange={onChange}
                required
              />

              <label>Marca do Veículo</label>
              <input
                name="brand"
                value={form.brand}
                onChange={onChange}
              />
            </div>

            <div className="column">
              <label>Ano</label>
              <input
                type="number"
                name="year"
                value={form.year}
                onChange={onChange}
              />

              <label>Placa</label>
              <input
                name="plate"
                value={form.plate}
                onChange={onChange}
              />

              <label>Cor</label>
              <input
                name="color"
                value={form.color}
                onChange={onChange}
              />

              <label>Quilometragem</label>
              <input
                type="number"
                name="mileage"
                value={form.mileage}
                onChange={onChange}
              />
            </div>

            <div className="full-width-field">
              <label>Observações</label>
              <textarea
                name="notes"
                rows="3"
                value={form.notes}
                onChange={onChange}
              />
            </div>

            <div className="full-width-field">
              <button type="submit" className="primary">
                Salvar Cliente
              </button>
            </div>
          </form>
        </div>
      </main>

      <footer>
        <p>&copy; 2025 RadiantGarage. Todos os direitos reservados.</p>
      </footer>
    </>
  );
}
