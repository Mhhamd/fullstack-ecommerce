import { createContext } from 'react';
import type { ProductI } from './AuthProvider';

interface User {
    email: string;
    role: string;
}

export interface AuthContextType {
    token: string | null;
    user: User | null;
    login: (token: string, user: User) => void;
    logout: () => void;
    getProduct: (product: ProductI) => void;
    currentProduct: ProductI | null;
    isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);
