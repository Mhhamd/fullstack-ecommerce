import { createContext } from 'react';

interface User {
    email: string;
    role: string;
}

export interface AuthContextType {
    token: string | null;
    user: User | null;
    login: (token: string, user: User) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);
