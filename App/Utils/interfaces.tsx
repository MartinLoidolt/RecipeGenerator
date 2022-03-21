export interface User {
    id: string;
    username: string;
    passwordHash: string;
}

export type Action = { type: string; payload: any };
