import type React from 'react';
import AuthForm from '../components/shared/AuthForm';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!firstName) {
            setError('First name is required');
            return;
        }

        if (!lastName) {
            setError('Last name is required');
            return;
        }

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
            const res = await fetch('http://localhost:3500/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstName, lastName, email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || 'Something went wrong');
                return;
            }

            toast.success('Account created successfully!', { autoClose: 5 });
            navigate('/login', { replace: true });
        } catch (error) {
            console.error(error);
            setError('Something went wrong. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <AuthForm
            title="Register"
            onSubmit={handleSubmit}
            fields={[
                {
                    name: 'First Name',
                    type: 'text',
                    id: 'firstName',
                    label: 'firstName',
                    placeholder: 'David',
                    value: firstName,
                    onChange: (e) => setFirstName(e.target.value),
                },
                {
                    name: 'Last Name',
                    type: 'text',
                    placeholder: 'Goggins',
                    id: 'lastName',
                    label: 'lastName',
                    value: lastName,
                    onChange: (e) => setLastName(e.target.value),
                },
                {
                    name: 'Email',
                    type: 'email',
                    placeholder: 'example@email.com',
                    id: 'email',
                    label: 'email',
                    value: email,
                    onChange: (e) => setEmail(e.target.value),
                },
                {
                    name: 'Password',
                    type: 'password',
                    placeholder: '••••••••',
                    id: 'password',
                    label: 'password',
                    value: password,
                    onChange: (e) => setPassword(e.target.value),
                },
            ]}
            error={error}
            isLoading={isLoading}
            buttonText="Register"
            linkText="Already have an account? Login here."
            linkTo="/login"
        />
    );
}

export default Register;
