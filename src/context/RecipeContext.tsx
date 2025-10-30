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
    ingredients: ['spaghetti', 'eggs', 'parmesan', 'pancetta', 'black pepper'],
    instructions: ['Cook pasta', 'Prepare sauce', 'Mix together'],
    image: 'https://via.placeholder.com/300x200',
    category: 'Italian',
    servings: 4,
    calories: 420,
    isFavorite: false,
  },
  {
    id: '2',
    title: 'Chicken Tikka Masala',
    rating: 4.7,
    time: 45,
    difficulty: 'medium',
    ingredients: ['chicken', 'tomatoes', 'cream', 'spices', 'onion'],
    instructions: ['Marinate chicken', 'Cook in sauce', 'Serve with rice'],
    image: 'https://via.placeholder.com/300x200',
    category: 'Indian',
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
    ingredients: ['lettuce', 'parmesan', 'croutons', 'caesar dressing', 'anchovies'],
    instructions: ['Mix salad', 'Add dressing', 'Top with parmesan'],
    image: 'https://via.placeholder.com/300x200',
    category: 'Salad',
    servings: 2,
    calories: 280,
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

  const value: RecipeContextType = {
    selectedIngredients,
    recipes,
    addIngredient,
    removeIngredient,
    clearIngredients,
    toggleFavorite,
    searchRecipes,
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