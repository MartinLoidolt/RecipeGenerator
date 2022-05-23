export interface User {
    id: number;
    username: string;
    passwordHash: string;
}

export interface Recipe {
    recipeId: number;
    name: string;
    description: string;
    imageUrl: string;
}

export interface RecipeProps {
    recipe: Recipe,
    style?: any
}

export type Action = { type: string; payload: any };
