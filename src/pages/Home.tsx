import { useNavigate } from 'react-router-dom';
import { useRecipe } from '../context/RecipeContext';
import {
  Layout,
  TopBar,
  SearchBar,
  IngredientBadge,
  RecipeCard,
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
    <Layout
      header={
        <TopBar title="I AM CHEF" showLogo={true} />
      }
      main={
        <div className="container">
          {/* Welcome Section */}
          <section className="welcome-section">
            <h2 className="welcome-title">Incominciamo a cucinare?</h2>
          </section>

          {/* Search Section */}
          <div className="search-section">
            <SearchBar
              placeholder="Aggiungi ingredienti che hai a casa..."
              onSelectSuggestion={handleSelectSuggestion}
              onSearch={handleSearch}
            />
          </div>

          {/* Ingredient Badges */}
          <div className="badge-container">
            <div className="badge-row" role="list" aria-label="Selected ingredients">
              {selectedIngredients.length === 0 ? (
                <p style={{ color: 'var(--muted)', fontSize: '14px', margin: 0 }}>
                  Aggiungi ingredienti per iniziare la ricerca
                </p>
              ) : (
                <>
                  {selectedIngredients.map((ingredient) => (
                    <IngredientBadge
                      key={ingredient}
                      label={ingredient}
                      onRemove={handleRemoveIngredient}
                    />
                  ))}
                  <p style={{ color: 'var(--primary)', fontSize: '14px', margin: '8px 0 0 0', fontWeight: '600' }}>
                    Vai al Feed per vedere le ricette con questi ingredienti! →
                  </p>
                </>
              )}
            </div>
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
      }
      footer={<BottomNav />}
    />
  );
}