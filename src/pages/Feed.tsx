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
    // Ignore touch events on buttons
    const target = e.target as HTMLElement;
    if (target.closest('button')) {
      return;
    }
    
    startY.current = e.touches[0].clientY;
    isDragging.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    
    // Ignore if touching buttons
    const target = e.target as HTMLElement;
    if (target.closest('button')) {
      return;
    }
    
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
        setCurrentIndex(prev => Math.min(prev + 1, recipes.length - 1));
      } else if (deltaY > 0 && currentIndex > 0) {
        // Swipe down - previous recipe
        setCurrentIndex(prev => Math.max(prev - 1, 0));
      }
    }

    isDragging.current = false;
    setExpandedIngredients(null); // Close expanded ingredients on swipe
  };

  const goToPrevious = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('goToPrevious - currentIndex:', currentIndex, 'recipes.length:', recipes.length);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('goToNext - currentIndex:', currentIndex, 'recipes.length:', recipes.length);
    if (currentIndex < recipes.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
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
        <div className="top-bar">
          <button onClick={() => navigate('/home')} className="back-button">
            ← Torna alla ricerca
          </button>
          <div className="feed-info">
            <span>{selectedIngredients.length} ingredienti • 0 ricette</span>
          </div>
        </div>
        
        <div className="container">
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h2>Nessuna ricetta trovata</h2>
            <p>Prova ad aggiungere ingredienti diversi per trovare ricette compatibili</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="top-bar">
        <button onClick={() => navigate('/home')} className="back-button">
          ← Indietro
        </button>
        <div className="feed-info">
          <span>{selectedIngredients.length} ingredienti • {recipes.length} ricette • Ricetta {currentIndex + 1}</span>
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
            <div className="placeholder-large">🍽️</div>
            
            <div className="recipe-overlay">
              {/* Navigation Arrows - Always visible for debugging */}
              <button
                className="nav-arrow prev"
                onClick={goToPrevious}
                aria-label="Ricetta precedente"
                disabled={currentIndex === 0}
              >
                ↑
              </button>
              
              <button
                className="nav-arrow next"
                onClick={goToNext}
                aria-label="Ricetta successiva" 
                disabled={currentIndex === recipes.length - 1}
              >
                ↓
              </button>

              {/* Heart Button */}
              <button
                className={`heart-button large ${currentRecipe.isFavorite ? 'active' : ''}`}
                onClick={() => toggleFavorite(currentRecipe.id)}
              >
                ♥
              </button>
            </div>
          </div>

          <div className="recipe-info-panel">
            <div className="recipe-header">
              <h1 className="recipe-title-large">{currentRecipe.title}</h1>
              <div className="recipe-meta">
                <div className="meta-item">
                  <span className="icon">⭐</span>
                  <span>{currentRecipe.rating}</span>
                </div>
                <div className="meta-item">
                  <span className="icon">🕒</span>
                  <span>{currentRecipe.time}min</span>
                </div>
                <div className="badge category-badge">
                  {currentRecipe.category}
                </div>
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
                    <div className="ingredients-grid">
                      {getMatchingIngredients(currentRecipe).map((ingredient, index) => (
                        <span key={index} className="badge ingredient-badge available">
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="ingredients-missing">
                    <h4>❌ Ingredienti mancanti</h4>
                    <div className="ingredients-grid">
                      {getMissingIngredients(currentRecipe).map((ingredient, index) => (
                        <span key={index} className="badge ingredient-badge missing">
                          {ingredient}
                        </span>
                      ))}
                    </div>
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
              className="btn-primary full-width"
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