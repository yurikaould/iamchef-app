import { useNavigate } from 'react-router-dom';
import { useRecipe } from '../context/RecipeContext';
import {
  TopBar,
  SearchBar,
  IngredientBadge,
  RecipeCard,
  FloatingActionButton,
  BottomNav,
} from '../components';
import '../styles/global.css';

export default function Home() {
  const navigate = useNavigate();
  const { selectedIngredients, recipes, addIngredient, removeIngredient, toggleFavorite } = useRecipe();

  const handleSearch = () => {
    // Navigate to feed with current ingredients
    navigate('/feed', { 
      state: { 
        ingredients: selectedIngredients,
        fromSearch: true 
      } 
    });
  };

  const handleSelectSuggestion = (ingredient: string) => {
    addIngredient(ingredient);
  };

  const handleRemoveIngredient = (ingredient: string) => {
    removeIngredient(ingredient);
  };

  // Get featured recipes (first 3 from mock data)
  const featuredRecipes = recipes.slice(0, 3);

  return (
    <div className="app">
      <TopBar title="I AM CHEF" showLogo={true} />
      
      <div className="container">
        {/* Welcome Section */}
        <section className="welcome-section">
          <h2 className="welcome-title">Incominciamo a cucinare?</h2>
        </section>

        {/* Search Section */}
        <SearchBar
          placeholder="Cerca ricette"
          onSelectSuggestion={handleSelectSuggestion}
          onSearch={handleSearch}
        />

        {/* Category Chips */}
        <div className="chips-container">
          <div className="chip active">Italiana</div>
          <div className="chip">Veloce</div>
          <div className="chip">Vegetariana</div>
          <div className="chip">Dessert</div>
          <div className="chip">Primo</div>
          <div className="chip">Secondo</div>
        </div>

        {/* Ingredient Badges */}
        <div className="badge-container">
          <div className="badge-row" role="list" aria-label="Selected ingredients">
            {selectedIngredients.length === 0 && (
              <p style={{ color: 'var(--muted)', fontSize: '14px', margin: 0 }}>
                Aggiungi ingredienti per iniziare la ricerca
              </p>
            )}
            {selectedIngredients.map((ingredient) => (
              <IngredientBadge
                key={ingredient}
                label={ingredient}
                onRemove={handleRemoveIngredient}
              />
            ))}
          </div>

          {/* Search Button */}
          <button
            className="search-button"
            onClick={handleSearch}
            disabled={selectedIngredients.length === 0}
            aria-label="Cerca ricette"
            type="button"
          >
            Cerca
          </button>
        </div>

        {/* Featured Recipes Section */}
        <section className="featured-section">
          <h2 className="section-title">Ricette in evidenza</h2>
          
          {/* Link to Feed */}
          <div style={{ textAlign: 'right', marginBottom: '16px' }}>
            <button 
              onClick={() => navigate('/feed')}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: 'var(--primary)', 
                fontSize: '14px', 
                fontWeight: '600',
                cursor: 'pointer',
                textDecoration: 'none'
              }}
            >
              Vai al Feed →
            </button>
          </div>
          
          <div className="recipes-grid">
            {featuredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton
        to="/feed"
        ariaLabel="Go to recipe feed"
        icon="+"
      />

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}