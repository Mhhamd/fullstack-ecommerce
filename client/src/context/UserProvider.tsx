import type React from 'react';
import { useState } from 'react';
import type UserI from '../types/userType';
import { UserContext } from './UserContext';

type Props = { children: React.ReactNode };

export const UserProvider = ({ children }: Props) => {
    const [user, setUser] = useState<UserI | null>(() => {
        const userData = localStorage.getItem('user');
        return userData ? JSON.parse(userData) : null;
    });
    const [token, setToken] = useState<string | null>(
        localStorage.getItem('token')
    );

    const login = (newToken: string, user: UserI) => {
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

    const updateUser = (updatedUser: UserI) => {
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    };

    const isAuthenticated = !!token;

    return (
        <UserContext.Provider
            value={{ login, logout, updateUser, user, token, isAuthenticated }}
        >
            {children}
        </UserContext.Provider>
    );
};
