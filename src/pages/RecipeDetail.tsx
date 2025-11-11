import { useParams, useNavigate } from 'react-router-dom';
import { useRecipe } from '../context/RecipeContext';
import '../styles/global.css';

export default function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { recipes, toggleFavorite } = useRecipe();
  
  const recipe = recipes.find(r => r.id === id);

  if (!recipe) {
    return (
      <div className="app">
        <div className="recipe-detail-header">
          <button onClick={() => navigate(-1)} className="back-button">
            ← Indietro
          </button>
        </div>
        <div className="page-container">
          <div className="error-state">
            <h2>Ricetta non trovata</h2>
            <p>La ricetta che stai cercando non esiste.</p>
          </div>
        </div>
      </div>
    );
  }

  const getCostLabel = (cost?: string) => {
    switch (cost) {
      case 'low': return 'Economica';
      case 'medium': return 'Media';
      case 'high': return 'Costosa';
      default: return 'N/A';
    }
  };

  const getDifficultyLabel = (difficulty?: string) => {
    switch (difficulty) {
      case 'easy': return 'Facile';
      case 'medium': return 'Media';
      case 'hard': return 'Difficile';
      default: return 'N/A';
    }
  };

  return (
    <div className="app">
      <div className="recipe-detail-header">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Indietro
        </button>
        <button
          className="favorite-btn-header"
          onClick={() => toggleFavorite(recipe.id)}
        >
          {recipe.isFavorite ? '❤️' : '🤍'}
        </button>
      </div>

      <div className="recipe-detail-container">
        <div className="recipe-hero">
          <div className="recipe-image-detail">
            {recipe.image ? (
              <img src={recipe.image} alt={recipe.title} />
            ) : (
              <div className="placeholder-detail">🍽️</div>
            )}
          </div>
          
          <div className="recipe-title-section">
            <h1 className="recipe-title-detail">{recipe.title}</h1>
            <div className="recipe-rating-detail">
              <span className="stars">⭐ {recipe.rating}</span>
              <span className="category-badge">{recipe.category}</span>
            </div>
          </div>
        </div>

        <div className="recipe-content">
          <div className="quick-stats">
            <div className="quick-stat">
              <span className="stat-icon">🕒</span>
              <span className="stat-text">{recipe.time} min</span>
            </div>
            <div className="quick-stat">
              <span className="stat-icon">👥</span>
              <span className="stat-text">{recipe.servings} porzioni</span>
            </div>
            <div className="quick-stat">
              <span className="stat-icon">⚡</span>
              <span className="stat-text">{recipe.calories} cal</span>
            </div>
            <div className="quick-stat">
              <span className="stat-icon">📊</span>
              <span className="stat-text">{getDifficultyLabel(recipe.difficulty)}</span>
            </div>
          </div>

          <div className="detail-section">
            <h2 className="section-title-detail">Informazioni Nutrizionali</h2>
            <div className="nutrition-grid">
              <div className="nutrition-item">
                <span className="nutrition-label">Proteine</span>
                <span className="nutrition-value">{recipe.nutritionalInfo?.protein || 0}g</span>
              </div>
              <div className="nutrition-item">
                <span className="nutrition-label">Carboidrati</span>
                <span className="nutrition-value">{recipe.nutritionalInfo?.carbs || 0}g</span>
              </div>
              <div className="nutrition-item">
                <span className="nutrition-label">Grassi</span>
                <span className="nutrition-value">{recipe.nutritionalInfo?.fat || 0}g</span>
              </div>
              <div className="nutrition-item">
                <span className="nutrition-label">Fibre</span>
                <span className="nutrition-value">{recipe.nutritionalInfo?.fiber || 0}g</span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h2 className="section-title-detail">Valutazioni</h2>
            <div className="ratings-grid">
              <div className="rating-item">
                <span className="rating-label">Salubrità</span>
                <div className="rating-bar">
                  <div 
                    className="rating-fill" 
                    style={{ width: `${(recipe.healthiness || 0) * 10}%` }}
                  />
                </div>
                <span className="rating-value">{recipe.healthiness}/10</span>
              </div>
              <div className="rating-item">
                <span className="rating-label">Sostenibilità</span>
                <div className="rating-bar">
                  <div 
                    className="rating-fill" 
                    style={{ width: `${(recipe.sustainability || 0) * 10}%` }}
                  />
                </div>
                <span className="rating-value">{recipe.sustainability}/10</span>
              </div>
              <div className="rating-item">
                <span className="rating-label">Costo</span>
                <span className="cost-badge">{getCostLabel(recipe.cost)}</span>
              </div>
            </div>
          </div>

          {recipe.diet && recipe.diet.length > 0 && (
            <div className="detail-section">
              <h2 className="section-title-detail">Dieta</h2>
              <div className="diet-list">
                {recipe.diet.map((dietType, index) => (
                  <span key={index} className="diet-badge">
                    🌱 {dietType}
                  </span>
                ))}
              </div>
            </div>
          )}

          {recipe.allergens && recipe.allergens.length > 0 && (
            <div className="detail-section">
              <h2 className="section-title-detail">Allergeni</h2>
              <div className="allergens-list">
                {recipe.allergens.map((allergen, index) => (
                  <span key={index} className="allergen-badge">
                    ⚠️ {allergen}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="detail-section">
            <h2 className="section-title-detail">Ingredienti</h2>
            <div className="ingredients-list-detail">
              {recipe.ingredients.map((ingredient, index) => (
                <div key={index} className="ingredient-item-detail">
                  <span className="ingredient-bullet">•</span>
                  <span className="ingredient-text">{ingredient}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="detail-section">
            <h2 className="section-title-detail">Preparazione</h2>
            <div className="instructions-list">
              {recipe.instructions.map((instruction, index) => (
                <div key={index} className="instruction-item">
                  <div className="instruction-number">{index + 1}</div>
                  <div className="instruction-text">{instruction}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}