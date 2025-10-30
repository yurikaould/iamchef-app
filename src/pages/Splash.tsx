import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImg from '../images/logo.png';

export default function Splash() {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        navigate('/home');
      }, 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}>
      <div className="splash-content">
        <div className="splash-logo">
          <img src={logoImg} alt="I AM CHEF Logo" />
        </div>
        <h1 className="splash-title">I AM CHEF</h1>
        <p className="splash-subtitle">Incominciamo a cucinare!</p>
      </div>
    </div>
  );
}