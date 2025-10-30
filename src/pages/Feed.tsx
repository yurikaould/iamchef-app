import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecipe } from '../context/RecipeContext';
import type { Recipe } from '../types/recipe';
import '../styles/global.css';

export default function Feed() {
  const navigate = useNavigate();
  const { selectedIngredients, getFilteredRecipes, toggleFavorite } = useRecipe();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [expandedIngredients, setExpandedIngredients] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const currentY = useRef(0);
  const isDragging = useRef(false);

  useEffect(() => {
    // Get filtered recipes based on selected ingredients
    const filteredRecipes = getFilteredRecipes();
    setRecipes(filteredRecipes.length > 0 ? filteredRecipes : []);
    setCurrentIndex(0);
  }, [selectedIngredients, getFilteredRecipes]);

  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
    isDragging.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    currentY.current = e.touches[0].clientY;
    const deltaY = currentY.current - startY.current;
    
    if (containerRef.current) {
      containerRef.current.style.transform = `translateY(${deltaY}px)`;
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    
    const deltaY = currentY.current - startY.current;
    const threshold = 100;

    if (containerRef.current) {
      containerRef.current.style.transform = '';
    }

    if (Math.abs(deltaY) > threshold) {
      if (deltaY < 0 && currentIndex < recipes.length - 1) {
        // Swipe up - next recipe
        setCurrentIndex(prev => prev + 1);
      } else if (deltaY > 0 && currentIndex > 0) {
        // Swipe down - previous recipe
        setCurrentIndex(prev => prev - 1);
      }
    }

    isDragging.current = false;
    setExpandedIngredients(null); // Close expanded ingredients on swipe
  };

  const currentRecipe = recipes[currentIndex];

  const getMissingIngredients = (recipe: Recipe) => {
    return recipe.ingredients.filter(ingredient =>
      !selectedIngredients.some(selected => 
        ingredient.toLowerCase().includes(selected.toLowerCase()) ||
        selected.toLowerCase().includes(ingredient.toLowerCase())
      )
    );
  };

  const getMatchingIngredients = (recipe: Recipe) => {
    return recipe.ingredients.filter(ingredient =>
      selectedIngredients.some(selected => 
        ingredient.toLowerCase().includes(selected.toLowerCase()) ||
        selected.toLowerCase().includes(ingredient.toLowerCase())
      )
    );
  };

  if (recipes.length === 0) {
    return (
      <div className="app">
        <div className="feed-header">
          <button onClick={() => navigate('/home')} className="back-button">
            ← Torna alla ricerca
          </button>
          <div className="feed-info">
            <span>{selectedIngredients.length} ingredienti • 0 ricette</span>
          </div>
        </div>
        
        <div className="feed-empty">
          <div className="empty-state">
            <h2>Nessuna ricetta trovata</h2>
            <p>Prova ad aggiungere ingredienti diversi per trovare ricette compatibili</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="feed-header">
        <button onClick={() => navigate('/home')} className="back-button">
          ← Indietro
        </button>
        <div className="feed-info">
          <span>{selectedIngredients.length} ingredienti • {recipes.length} ricette</span>
        </div>
      </div>

      <div 
        className="feed-container"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        ref={containerRef}
      >
        <div className="recipe-card-fullscreen">
          <div className="recipe-image-large">
            {currentRecipe.image ? (
              <img src={currentRecipe.image} alt={currentRecipe.title} />
            ) : (
              <div className="placeholder-large">🍽️</div>
            )}
            
            <div className="recipe-overlay">
              <button
                className="favorite-btn-large"
                onClick={() => toggleFavorite(currentRecipe.id)}
              >
                {currentRecipe.isFavorite ? '❤️' : '🤍'}
              </button>
            </div>
          </div>

          <div className="recipe-info-panel">
            <div className="recipe-header">
              <h1 className="recipe-title-large">{currentRecipe.title}</h1>
              <div className="recipe-meta-large">
                <span className="rating">⭐ {currentRecipe.rating}</span>
                <span className="time">🕒 {currentRecipe.time}min</span>
                <span className="category">{currentRecipe.category}</span>
              </div>
            </div>

            <div className="ingredients-section">
              <div className="ingredients-header">
                <h3>Ingredienti</h3>
                <button
                  className="expand-btn"
                  onClick={() => setExpandedIngredients(
                    expandedIngredients === currentRecipe.id ? null : currentRecipe.id
                  )}
                >
                  {expandedIngredients === currentRecipe.id ? 'Chiudi' : 'Mostra tutti'}
                </button>
              </div>

              {expandedIngredients === currentRecipe.id && (
                <div className="ingredients-expanded">
                  <div className="ingredients-available">
                    <h4>✅ Ingredienti disponibili</h4>
                    {getMatchingIngredients(currentRecipe).map((ingredient, index) => (
                      <span key={index} className="ingredient-item available">
                        {ingredient}
                      </span>
                    ))}
                  </div>
                  
                  <div className="ingredients-missing">
                    <h4>❌ Ingredienti mancanti</h4>
                    {getMissingIngredients(currentRecipe).map((ingredient, index) => (
                      <span key={index} className="ingredient-item missing">
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="recipe-stats">
              <div className="stat">
                <span className="stat-label">Porzioni</span>
                <span className="stat-value">{currentRecipe.servings}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Difficoltà</span>
                <span className="stat-value">{currentRecipe.difficulty}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Calorie</span>
                <span className="stat-value">{currentRecipe.calories}</span>
              </div>
            </div>

            <button 
              className="view-recipe-btn"
              onClick={() => navigate(`/recipe/${currentRecipe.id}`)}
            >
              Vedi Ricetta Completa
            </button>
          </div>

          <div className="swipe-indicator">
            <div className="swipe-dots">
              {recipes.map((_, index) => (
                <div 
                  key={index}
                  className={`dot ${index === currentIndex ? 'active' : ''}`}
                />
              ))}
            </div>
            <p className="swipe-hint">Scorri per la prossima ricetta</p>
          </div>
        </div>
      </div>
    </div>
  );
}