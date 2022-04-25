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

export type Action = { type: string; payload: any };
