import { useParams } from 'react-router-dom';
import { TopBar, BottomNav } from '../components';
import '../styles/global.css';

export default function RecipeDetail() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="app">
      <TopBar title="Dettaglio Ricetta" back={true} onBack={() => window.history.back()} />
      
      <div className="page-container">
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '50vh',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <h2>Recipe Detail</h2>
          <p style={{ color: '#666', textAlign: 'center' }}>
            Dettaglio per la ricetta con ID: {id}
          </p>
          <p style={{ color: '#666', textAlign: 'center' }}>
            La pagina del dettaglio ricetta verrà implementata nella prossima fase del progetto.
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}