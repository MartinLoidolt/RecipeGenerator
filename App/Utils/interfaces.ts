export interface User {
    id: number;
    username: string;
    passwordHash: string;
}

export interface Ingredient {
    ingredientId: number,
    name: string,
    unit: string,
}

export interface RecipeIngredient {
    ingredient: Ingredient,
    amount: number,
}

export interface Recipe {
    recipeId: number;
    name: string;
    description: string;
    imageUrl: string;
    ingredients: RecipeIngredient[];
}

export interface RecipeProps {
    recipe: Recipe,
    style?: any
}

export type Action = { type: string; payload: any };
