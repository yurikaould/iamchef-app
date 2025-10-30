import type { ReactNode } from 'react';

interface TopBarProps {
  title: string;
  back?: boolean;
  onBack?: () => void;
  children?: ReactNode;
}

export default function TopBar({ title, back = false, onBack, children }: TopBarProps) {
  return (
    <header className="topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {back && (
          <button 
            className="topbar-back" 
            onClick={onBack}
            aria-label="Go back"
          >
            ←
          </button>
        )}
        <h1>{title}</h1>
      </div>
      {children}
    </header>
  );
}