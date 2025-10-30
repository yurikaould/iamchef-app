import type { ReactNode } from 'react';

interface TopBarProps {
  title: string;
  back?: boolean;
  onBack?: () => void;
  children?: ReactNode;
  showLogo?: boolean;
}

export default function TopBar({ title, back = false, onBack, children, showLogo = false }: TopBarProps) {
  return (
    <header className="topbar">
      {back && (
        <button 
          className="topbar-back" 
          onClick={onBack}
          aria-label="Go back"
        >
          ←
        </button>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
        {showLogo && (
          <img 
            src="/logo.png" 
            alt="I AM CHEF Logo" 
            className="topbar-logo"
          />
        )}
        <h1>{title}</h1>
      </div>
      {children}
    </header>
  );
}