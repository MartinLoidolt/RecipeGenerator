export interface User {
    id: number;
    username: string;
    passwordHash: string;
}

export interface Recipe {
    id: number;
    name: string;
    description: string;
    image: string;
}

export interface RecipeProps {
    recipe: Recipe,
    style?: any
}

export type Action = { type: string; payload: any };
