import "../styles/procura.css";

const options = [
  { label: "Manutenção e Mecânica Geral", value: "manutencao e mecanica geral" },
  { label: "Ar e Climatização", value: "ar e climatizacao" },
  { label: "Estética Automotiva", value: "estetica automotiva" },
  { label: "Interior e Conforto", value: "interior e conforto" },
  { label: "Segurança e Direção", value: "seguranca e direcao" },
  { label: "Diagnóstico e Revisão", value: "diagnostico e revisao" },
  { label: "Estética Externa", value: "estetica externa" }
];

export default function ProcuraView({
  open,
  setOpen,
  selected,
  onToggle,
  onClear,
  selectedText,
  services
}) {
  return (
    <>
      <header className="header">
        <div className="logo">
          <div className="logo-icon"></div>
          <span>RadiantGarage</span>
        </div>
      </header>

      <main>
        <aside className="search-filters">
          <h2>Filtros de Busca</h2>

          <div className="multi-select">
            <div className="select-box" onClick={() => setOpen(!open)}>
              <span>{selectedText}</span>
              <i className="arrow">▼</i>
            </div>

            {open && (
              <div className="options-container">
                {options.map(opt => (
                  <label key={opt.value}>
                    <input
                      type="checkbox"
                      checked={selected.includes(opt.value)}
                      onChange={() => onToggle(opt.value)}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            )}
          </div>

          <button className="clear-btn" onClick={onClear}>
            Limpar Filtros
          </button>
        </aside>

        <section className="service-results">
          <h2>Serviços Disponíveis</h2>

          {services.length === 0 && (
            <p>Nenhum serviço encontrado.</p>
          )}

          {services.map(service => (
            <div key={service.id} className="service-card">
              <img src={service.img} alt={service.title} />
              <div className="service-info">
                <h3>{service.title}</h3>
                <h5>R$ {service.price}</h5>
                <a href="/detalhes">Ver mais</a>
              </div>
            </div>
          ))}
        </section>
      </main>

      <footer>
        <p>&copy; 2025 RadiantGarage</p>
      </footer>
    </>
  );
}
