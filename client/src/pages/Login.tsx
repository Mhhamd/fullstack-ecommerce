import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/useUser';
import AuthForm from '../components/shared/AuthForm';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const { login, isAuthenticated } = useUser();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/', { replace: true });
        }
    }, [isAuthenticated, navigate]);

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
                toast.error(data.message || 'Something went wrong');
                return;
            }

            toast.success('Login Successful', { autoClose: 5 });
            login(data.token, data.user);
            navigate('/', { replace: true });
        } catch (error) {
            console.error(error);
            setError('Something went wrong. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <AuthForm
            title="Login"
            onSubmit={handleSubmit}
            fields={[
                {
                    name: 'email',
                    type: 'email',
                    placeholder: 'Email',
                    id: 'email',
                    value: email,
                    label: 'Email',
                    onChange: (e) => setEmail(e.target.value),
                },
                {
                    name: 'password',
                    id: 'password',
                    type: 'password',
                    placeholder: 'Password',
                    value: password,
                    label: 'Email',
                    onChange: (e) => setPassword(e.target.value),
                },
            ]}
            error={error}
            buttonText="Login"
            linkText="New New here? Sign up now."
            linkTo="/register"
            isLoading={isLoading}
        />
    );
}

export default Login;
