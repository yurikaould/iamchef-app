import { TopBar, BottomNav } from '../components';
import '../styles/global.css';

export default function Feed() {
  return (
    <div className="app">
      <TopBar title="Feed" back={true} onBack={() => window.history.back()} />
      
      <div className="page-container">
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '50vh',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <h2>Feed Page</h2>
          <p style={{ color: '#666', textAlign: 'center' }}>
            La pagina del feed verrà implementata nella prossima fase del progetto.
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}