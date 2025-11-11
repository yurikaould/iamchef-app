import React from 'react';
import '../styles/global.css';

// Props interface per il Layout component
interface LayoutProps {
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  main: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

/**
 * Layout Component - Struttura base per le pagine dell'app
 * 
 * @param header - Componente header (es. TopBar)
 * @param sidebar - Componente sidebar (opzionale)
 * @param main - Contenuto principale della pagina
 * @param footer - Componente footer (es. BottomNav)
 * @param className - Classi CSS aggiuntive
 */
function Layout({ 
  header, 
  sidebar, 
  main, 
  footer, 
  className = '' 
}: LayoutProps) {
  return (
    <div className={`layout ${className}`.trim()}>
      {/* Header Section */}
      {header && (
        <header className="layout-header">
          {header}
        </header>
      )}
      
      {/* Content Section */}
      <div className="layout-content">
        {/* Sidebar - Optional */}
        {sidebar && (
          <aside className="layout-sidebar">
            {sidebar}
          </aside>
        )}
        
        {/* Main Content */}
        <main className={`layout-main ${sidebar ? 'with-sidebar' : 'full-width'}`}>
          {main}
        </main>
      </div>
      
      {/* Footer Section */}
      {footer && (
        <footer className="layout-footer">
          {footer}
        </footer>
      )}
    </div>
  );
}

export default Layout;