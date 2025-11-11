import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Recipe, RecipeContextType } from '../types/recipe';

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

// Mock data for featured recipes
const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Carbonara Classica',
    rating: 4.8,
    time: 25,
    difficulty: 'medium',
    ingredients: ['spaghetti', 'uova', 'parmigiano', 'guanciale', 'pepe nero'],
    instructions: [
      'Metti a bollire abbondante acqua salata per la pasta',
      'Taglia il guanciale a cubetti e rosola in padella senza olio',
      'In una ciotola sbatti le uova con il parmigiano grattugiato',
      'Cuoci gli spaghetti al dente e scolali',
      'Unisci la pasta al guanciale nella padella',
      'Spegni il fuoco e aggiungi il composto di uova mescolando velocemente',
      'Servi subito con pepe nero macinato fresco'
    ],
    category: 'Primi Piatti',
    servings: 4,
    calories: 420,
    isFavorite: false,
    cost: 'medium',
    healthiness: 6,
    dishType: 'Pasta',
    allergens: ['glutine', 'uova', 'latticini'],
    sustainability: 5,
    diet: [],
    nutritionalInfo: {
      protein: 18,
      carbs: 45,
      fat: 15,
      fiber: 3
    }
  },
  {
    id: '2',
    title: 'Risotto ai Funghi',
    rating: 4.7,
    time: 45,
    difficulty: 'medium',
    ingredients: ['riso carnaroli', 'funghi porcini', 'parmigiano', 'brodo vegetale', 'cipolla', 'vino bianco'],
    instructions: ['Soffriggi la cipolla', 'Tosta il riso', 'Aggiungi brodo gradualmente', 'Manteca con parmigiano'],
    category: 'Secondi Piatti',
    servings: 4,
    calories: 380,
    isFavorite: false,
  },
  {
    id: '3',
    title: 'Pizza Margherita',
    rating: 4.9,
    time: 90,
    difficulty: 'medium',
    ingredients: ['farina', 'pomodoro', 'mozzarella', 'basilico', 'olio', 'lievito'],
    instructions: ['Prepara impasto', 'Lascia lievitare', 'Stendi e condisci', 'Cuoci in forno'],
    category: 'Primi Piatti',
    servings: 4,
    calories: 350,
    isFavorite: false,
  },
  {
    id: '4',
    title: 'Tiramisù',
    rating: 4.8,
    time: 30,
    difficulty: 'easy',
    ingredients: ['mascarpone', 'caffè', 'savoiardi', 'uova', 'zucchero', 'cacao'],
    instructions: ['Prepara crema al mascarpone', 'Inzuppa savoiardi', 'Componi a strati'],
    category: 'Dolci',
    servings: 6,
    calories: 450,
    isFavorite: false,
  },
  {
    id: '5',
    title: 'Pasta al Pomodoro',
    rating: 4.4,
    time: 20,
    difficulty: 'easy',
    ingredients: ['pasta', 'pomodoro', 'basilico', 'aglio', 'olio'],
    instructions: ['Cuoci la pasta', 'Prepara sugo semplice', 'Manteca e servi'],
    category: 'Primi Piatti',
    servings: 4,
    calories: 300,
    isFavorite: false,
  },
];

interface RecipeProviderProps {
  children: ReactNode;
}

export function RecipeProvider({ children }: RecipeProviderProps) {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [recipes] = useState<Recipe[]>(mockRecipes);

  // Load ingredients from localStorage on mount
  useEffect(() => {
    const savedIngredients = localStorage.getItem('selectedIngredients');
    if (savedIngredients) {
      setSelectedIngredients(JSON.parse(savedIngredients));
    }
  }, []);

  // Save ingredients to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('selectedIngredients', JSON.stringify(selectedIngredients));
  }, [selectedIngredients]);

  const addIngredient = (ingredient: string) => {
    const cleanIngredient = ingredient.trim().toLowerCase();
    if (cleanIngredient && !selectedIngredients.includes(cleanIngredient)) {
      setSelectedIngredients(prev => [...prev, cleanIngredient]);
    }
  };

  const removeIngredient = (ingredient: string) => {
    setSelectedIngredients(prev => prev.filter(item => item !== ingredient));
  };

  const clearIngredients = () => {
    setSelectedIngredients([]);
  };

  const toggleFavorite = (recipeId: string) => {
    // This would update the recipe's favorite status in a real app
    console.log('Toggle favorite for recipe:', recipeId);
  };

  const searchRecipes = (query: string): Recipe[] => {
    if (!query) return recipes;
    
    const lowerQuery = query.toLowerCase();
    return recipes.filter(recipe => 
      recipe.title.toLowerCase().includes(lowerQuery) ||
      recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(lowerQuery)) ||
      recipe.category?.toLowerCase().includes(lowerQuery)
    );
  };

  const getFilteredRecipes = () => {
    if (selectedIngredients.length === 0) {
      return recipes;
    }

    // Calculate compatibility score for each recipe
    const recipesWithScore = recipes.map(recipe => {
      const matchingIngredients = selectedIngredients.filter(selectedIngredient => 
        recipe.ingredients.some(recipeIngredient => 
          recipeIngredient.toLowerCase().includes(selectedIngredient.toLowerCase()) ||
          selectedIngredient.toLowerCase().includes(recipeIngredient.toLowerCase()) ||
          // Special matches for common ingredient variations
          (selectedIngredient === 'pasta' && ['spaghetti', 'penne', 'linguine', 'rigatoni'].some(p => recipeIngredient.toLowerCase().includes(p))) ||
          (selectedIngredient === 'formaggio' && ['parmigiano', 'pecorino', 'mozzarella', 'gorgonzola'].some(f => recipeIngredient.toLowerCase().includes(f))) ||
          (recipeIngredient.toLowerCase() === selectedIngredient.toLowerCase())
        )
      );
      
      const compatibilityScore = matchingIngredients.length / recipe.ingredients.length;
      const hasMatchingIngredients = matchingIngredients.length > 0;      return {
        ...recipe,
        compatibilityScore,
        matchingIngredients: matchingIngredients.length,
        hasMatchingIngredients
      };
    });

    // Filter recipes that have at least one matching ingredient
    const filteredRecipes = recipesWithScore.filter(recipe => recipe.hasMatchingIngredients);

    // Sort by compatibility (desc) then by time (asc)
    return filteredRecipes.sort((a, b) => {
      if (a.compatibilityScore !== b.compatibilityScore) {
        return b.compatibilityScore - a.compatibilityScore;
      }
      return a.time - b.time;
    });
  };

  const value: RecipeContextType = {
    selectedIngredients,
    recipes,
    addIngredient,
    removeIngredient,
    clearIngredients,
    toggleFavorite,
    searchRecipes,
    getFilteredRecipes,
  };

  return (
    <RecipeContext.Provider value={value}>
      {children}
    </RecipeContext.Provider>
  );
}

export function useRecipe(): RecipeContextType {
  const context = useContext(RecipeContext);
  if (context === undefined) {
    throw new Error('useRecipe must be used within a RecipeProvider');
  }
  return context;
}