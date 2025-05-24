import React, { useState } from 'react';
import { AuthContext } from './AuthContext';

type Props = { children: React.ReactNode };

interface User {
    email: string;
    role: string;
}

export const AuthProvider = ({ children }: Props) => {
    const [token, setToken] = useState<string | null>(
        localStorage.getItem('token')
    );
    const [user, setUser] = useState<User | null>(() => {
        const userData = localStorage.getItem('user');
        return userData ? JSON.parse(userData) : null;
    });

    const login = (newToken: string, user: User) => {
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(user));
        setToken(newToken);
        setUser(user);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
    };

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider
            value={{ token, user, login, logout, isAuthenticated }}
        >
            {children}
        </AuthContext.Provider>
    );
};
