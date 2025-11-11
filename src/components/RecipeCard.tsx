import { useNavigate } from 'react-router-dom';
import type { Recipe } from '../types/recipe';

interface RecipeCardProps {
  recipe: Recipe;
  onToggleFavorite?: (recipeId: string) => void;
}

export default function RecipeCard({ recipe, onToggleFavorite }: RecipeCardProps) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/recipe/${recipe.id}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    onToggleFavorite?.(recipe.id);
  };

  const formatTime = (minutes: number) => {
    return minutes < 60 ? `${minutes}m` : `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
  };

  return (
    <div 
      className="recipe-card"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      aria-label={`View recipe for ${recipe.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
    >
      <div className="recipe-image">
        {recipe.image ? (
          <img 
            src={recipe.image} 
            alt={recipe.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <span>📸 Foto ricetta</span>
        )}
        <span className="recipe-difficulty-badge">
          {recipe.difficulty === 'easy' ? 'Facile' : recipe.difficulty === 'medium' ? 'Medio' : 'Difficile'}
        </span>
      </div>
      
      <div className="recipe-content">
        <h3 className="recipe-title">{recipe.title}</h3>
        
        <div className="recipe-meta">
          <div className="recipe-rating">
            <span>⭐</span>
            <span>{recipe.rating}</span>
          </div>
          
          <div className="recipe-time">
            <span>🕒</span>
            <span>{formatTime(recipe.time)}</span>
          </div>
        </div>
        
        <button
          className={`favorite-button ${recipe.isFavorite ? 'active' : ''}`}
          onClick={handleFavoriteClick}
          aria-label={recipe.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          type="button"
        >
          ♥
        </button>
      </div>
    </div>
  );
}