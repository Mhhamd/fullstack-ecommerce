import React, { useState } from 'react';
import { AuthContext } from './AuthContext';

type Props = { children: React.ReactNode };

interface User {
    email: string;
    role: string;
}

export interface ProductI {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string[];
    category: string;
    subCategory: string;
    sizes: string[];
    bestSeller: boolean;
    date: Date;
}

export const AuthProvider = ({ children }: Props) => {
    const [token, setToken] = useState<string | null>(
        localStorage.getItem('token')
    );
    const [user, setUser] = useState<User | null>(() => {
        const userData = localStorage.getItem('user');
        return userData ? JSON.parse(userData) : null;
    });

    const [currentProduct, setCurrentProduct] = useState<ProductI | null>(
        () => {
            const productData = localStorage.getItem('currentProduct');
            return productData ? JSON.parse(productData) : null;
        }
    );

    const login = (newToken: string, user: User) => {
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(user));
        setToken(newToken);
        setUser(user);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('currentProduct');
        setToken(null);
        setUser(null);
        setCurrentProduct(null);
    };

    const getProduct = (product: ProductI) => {
        setCurrentProduct(product);
        localStorage.setItem('currentProduct', JSON.stringify(product));
    };

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                login,
                logout,
                isAuthenticated,
                currentProduct,
                getProduct,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
