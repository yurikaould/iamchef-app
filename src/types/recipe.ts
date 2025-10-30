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
  // Additional fields for detailed view
  cost?: 'low' | 'medium' | 'high';
  healthiness?: number; // 1-10 scale
  dishType?: string;
  allergens?: string[];
  sustainability?: number; // 1-10 scale
  diet?: string[]; // vegetarian, vegan, gluten-free, etc.
  nutritionalInfo?: {
    protein?: number;
    carbs?: number;
    fat?: number;
    fiber?: number;
  };
}

export interface RecipeContextType {
  selectedIngredients: string[];
  recipes: Recipe[];
  addIngredient: (ingredient: string) => void;
  removeIngredient: (ingredient: string) => void;
  clearIngredients: () => void;
  toggleFavorite: (recipeId: string) => void;
  searchRecipes: (query: string) => Recipe[];
  getFilteredRecipes: () => Recipe[];
}

export interface SearchSuggestion {
  id: string;
  value: string;
  type: 'ingredient' | 'recipe';
}