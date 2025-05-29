import { createContext } from 'react';
import type UserI from '../types/userType';

export interface UserContextType {
    user: UserI | null;
    token: string | null;
    login: (token: string, user: UserI) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

export const UserContext = createContext<UserContextType | undefined>(
    undefined
);
