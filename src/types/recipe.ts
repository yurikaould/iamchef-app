export interface Recipe {
  id: string;
  title: string;
  rating: number;
  time: number; // in minutes
  difficulty?: 'easy' | 'medium' | 'hard';
  ingredients: string[];
  instructions: string[];
  image?: string;
  category?: string;
  servings?: number;
  calories?: number;
  isFavorite?: boolean;
}

export interface RecipeContextType {
  selectedIngredients: string[];
  recipes: Recipe[];
  addIngredient: (ingredient: string) => void;
  removeIngredient: (ingredient: string) => void;
  clearIngredients: () => void;
  toggleFavorite: (recipeId: string) => void;
  searchRecipes: (query: string) => Recipe[];
}

export interface SearchSuggestion {
  id: string;
  value: string;
  type: 'ingredient' | 'recipe';
}