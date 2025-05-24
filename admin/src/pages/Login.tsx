import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email) {
            setError('Email is required');
            return;
        }
        if (!password) {
            setError('Password is required');
            return;
        }
        setIsLoading(true);
        try {
            const res = await fetch('http://localhost:3500/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || 'Login failed');
                return;
            }

            if (data.user.role !== 'admin') {
                setError('Access denied: Admins only');
                return;
            }

            if (res.ok && data.user.role === 'admin') {
                login(data.token, data.user);
                navigate('/add');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Something went wrong. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-2xl ">
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-bold text-gray-800">
                        MercadoX Admin Panel
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                            placeholder="••••••••"
                        />
                    </div>

                    {error && <p className="text-sm text-red-600">{error}</p>}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all duration-300  ${
                            isLoading
                                ? 'opacity-50 cursor-not-allowed'
                                : 'cursor-pointer'
                        }`}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
