import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { RecipeProvider } from './context/RecipeContext';
import Home from './pages/Home';
import Feed from './pages/Feed';
import RecipeDetail from './pages/RecipeDetail';
import './styles/global.css';

function App() {
  return (
    <RecipeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/add" element={<div>Add Recipe Page (Coming Soon)</div>} />
          <Route path="/favorites" element={<div>Favorites Page (Coming Soon)</div>} />
          <Route path="/profile" element={<div>Profile Page (Coming Soon)</div>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </RecipeProvider>
  );
}

export default App;
