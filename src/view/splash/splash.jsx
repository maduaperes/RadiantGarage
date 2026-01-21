import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/splash.css";
import logo from "../../assets/IMG/logo.png";

export default function Splash() {
  const navigate = useNavigate();

  function handleEnter() {
    navigate("/login");
  }

  // Auto redirect opcional (comentado igual ao JS original)
  useEffect(() => {
    const timer = setTimeout(() => {
      // navigate("/login");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
      <header className="top">
        <img src={logo} className="mini" alt="logo" />
        <div className="user">👋 Olá, João</div>
      </header>

      <main className="splash">
        <img
          className="logo"
          src={`data:image/svg+xml;utf8,
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 140 140'>
            <defs>
              <linearGradient id='g' x1='0' x2='1'>
                <stop offset='0' stop-color='%232563eb'/>
                <stop offset='1' stop-color='%23f97316'/>
              </linearGradient>
            </defs>
            <rect rx='24' width='140' height='140' fill='url(%23g)' />
            <g transform='translate(20,45)' fill='white'>
              <rect x='15' y='20' width='70' height='25' rx='8'/>
              <rect x='25' y='10' width='50' height='15' rx='4'/>
              <circle cx='30' cy='55' r='10'/>
              <circle cx='70' cy='55' r='10'/>
            </g>
            <g fill='white' opacity='0.85'>
              <circle cx='100' cy='30' r='6'/>
              <circle cx='115' cy='20' r='4'/>
              <circle cx='110' cy='40' r='5'/>
            </g>
            <text x='50%' y='125' text-anchor='middle'
                  font-family='Arial, sans-serif'
                  font-size='16' font-weight='bold'
                  fill='white'>LavaJato</text>
          </svg>`}
          alt="Logo LavaJato"
        />

        <h1>Bem-vindo ao Lava Rápido</h1>
        <p>Seu carro limpo com praticidade. Agende, acompanhe e avalie.</p>

        <button className="primary" onClick={handleEnter}>
          Entrar
        </button>
      </main>
    </>
  );
}
