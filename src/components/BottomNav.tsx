import { useNavigate, useLocation } from 'react-router-dom';

interface NavItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: '🏠', path: '/' },
  { id: 'feed', label: 'Feed', icon: '📱', path: '/feed' },
  { id: 'add', label: 'Aggiungi', icon: '➕', path: '/add' },
  { id: 'favorites', label: 'Preferiti', icon: '❤️', path: '/favorites' },
  { id: 'profile', label: 'Profilo', icon: '👤', path: '/profile' },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bottom-nav" role="navigation" aria-label="Main navigation">
      <div className="bottom-nav-container">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
            onClick={() => handleNavClick(item.path)}
            aria-label={item.label}
            type="button"
          >
            <span className="nav-icon" role="img" aria-hidden="true">
              {item.icon}
            </span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}