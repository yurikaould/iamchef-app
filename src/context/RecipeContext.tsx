import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Recipe, RecipeContextType } from '../types/recipe';

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

// Mock data for featured recipes
const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Spaghetti Carbonara',
    rating: 4.8,
    time: 25,
    difficulty: 'medium',
    ingredients: ['spaghetti', 'uova', 'parmigiano', 'pancetta', 'pepe nero'],
    instructions: [
      'Metti a bollire abbondante acqua salata per la pasta',
      'Taglia la pancetta a cubetti e rosola in padella senza olio',
      'In una ciotola sbatti le uova con il parmigiano grattugiato',
      'Cuoci gli spaghetti al dente e scolali',
      'Unisci la pasta alla pancetta nella padella',
      'Spegni il fuoco e aggiungi il composto di uova mescolando velocemente',
      'Servi subito con pepe nero macinato fresco'
    ],
    image: 'https://via.placeholder.com/400x600',
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
    title: 'Chicken Tikka Masala',
    rating: 4.7,
    time: 45,
    difficulty: 'medium',
    ingredients: ['pollo', 'pomodori', 'panna', 'spezie', 'cipolla', 'aglio'],
    instructions: ['Marina il pollo', 'Cuoci in salsa speziata', 'Servi con riso basmati'],
    image: 'https://via.placeholder.com/400x600',
    category: 'Secondi Piatti',
    servings: 4,
    calories: 380,
    isFavorite: false,
  },
  {
    id: '3',
    title: 'Caesar Salad',
    rating: 4.5,
    time: 15,
    difficulty: 'easy',
    ingredients: ['lattuga', 'parmigiano', 'crostini', 'salsa caesar', 'acciughe'],
    instructions: ['Taglia la lattuga', 'Prepara la salsa', 'Componi e servi'],
    image: 'https://via.placeholder.com/400x600',
    category: 'Insalate',
    servings: 2,
    calories: 280,
    isFavorite: false,
  },
  {
    id: '4',
    title: 'Pizza Margherita',
    rating: 4.9,
    time: 90,
    difficulty: 'medium',
    ingredients: ['farina', 'pomodoro', 'mozzarella', 'basilico', 'olio', 'lievito'],
    instructions: ['Prepara impasto', 'Lascia lievitare', 'Stendi e condisci', 'Cuoci in forno'],
    image: 'https://via.placeholder.com/400x600',
    category: 'Primi Piatti',
    servings: 4,
    calories: 350,
    isFavorite: false,
  },
  {
    id: '5',
    title: 'Risotto ai Funghi',
    rating: 4.6,
    time: 35,
    difficulty: 'medium',
    ingredients: ['riso carnaroli', 'funghi porcini', 'brodo', 'vino bianco', 'cipolla', 'parmigiano'],
    instructions: ['Tosta il riso', 'Aggiungi brodo gradualmente', 'Incorpora funghi e manteca'],
    image: 'https://via.placeholder.com/400x600',
    category: 'Primi Piatti',
    servings: 4,
    calories: 320,
    isFavorite: false,
  },
  {
    id: '6',
    title: 'Tiramisù',
    rating: 4.8,
    time: 30,
    difficulty: 'easy',
    ingredients: ['mascarpone', 'caffè', 'savoiardi', 'uova', 'zucchero', 'cacao'],
    instructions: ['Prepara crema al mascarpone', 'Inzuppa savoiardi', 'Componi a strati'],
    image: 'https://via.placeholder.com/400x600',
    category: 'Dolci',
    servings: 6,
    calories: 450,
    isFavorite: false,
  },
  {
    id: '7',
    title: 'Pasta al Pomodoro',
    rating: 4.4,
    time: 20,
    difficulty: 'easy',
    ingredients: ['pasta', 'pomodoro', 'basilico', 'aglio', 'olio'],
    instructions: ['Cuoci la pasta', 'Prepara sugo semplice', 'Manteca e servi'],
    image: 'https://via.placeholder.com/400x600',
    category: 'Primi Piatti',
    servings: 4,
    calories: 300,
    isFavorite: false,
  },
  {
    id: '8',
    title: 'Insalata Caprese',
    rating: 4.3,
    time: 10,
    difficulty: 'easy',
    ingredients: ['mozzarella', 'pomodoro', 'basilico', 'olio'],
    instructions: ['Taglia mozzarella e pomodoro', 'Componi piatto', 'Condisci'],
    image: 'https://via.placeholder.com/400x600',
    category: 'Antipasti',
    servings: 2,
    calories: 250,
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

  const getFilteredRecipes = (): Recipe[] => {
    if (selectedIngredients.length === 0) return recipes;
    
    // Calculate compatibility score for each recipe
    const recipesWithScore = recipes.map(recipe => {
      const matchingIngredients = recipe.ingredients.filter(ingredient =>
        selectedIngredients.some(selected => 
          ingredient.toLowerCase().includes(selected.toLowerCase()) ||
          selected.toLowerCase().includes(ingredient.toLowerCase())
        )
      );
      
      const compatibilityScore = matchingIngredients.length / recipe.ingredients.length;
      const hasMatchingIngredients = matchingIngredients.length > 0;
      
      return {
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