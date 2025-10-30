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
      
      <div className="page-container">
        {/* Welcome Section */}
        <section className="welcome-section">
          <h2 className="welcome-title">Benvenuto in I AM CHEF</h2>
          <p className="welcome-subtitle">Incominciamo a cucinare!</p>
        </section>

        {/* Search Section */}
        <section className="search-section">
          <div className="search-row">
            <SearchBar
              placeholder="Cerca ingredienti o ricette..."
              onSelectSuggestion={handleSelectSuggestion}
              onSearch={handleSearch}
            />
            <button 
              className="filter-button"
              aria-label="Open filters"
              type="button"
            >
              🔍
            </button>
          </div>

          {/* Ingredient Badges */}
          <div className="badge-row" role="list" aria-label="Selected ingredients">
            {selectedIngredients.length === 0 && (
              <p style={{ color: '#999', fontSize: '14px', margin: 0 }}>
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
            aria-label="Search recipes with selected ingredients"
            type="button"
          >
            Cerca Ricette
          </button>
        </section>

        {/* Featured Recipes Section */}
        <section className="featured-section">
          <h2 className="section-title">Ricette in evidenza</h2>
          <div className="cards-grid">
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
        icon="📱"
      />

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}