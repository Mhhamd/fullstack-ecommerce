import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/useUser';
import { toast } from 'react-toastify';

type Props = {
    children: React.ReactNode;
};

function ProtectedRoute({ children }: Props) {
    const { token, logout } = useUser();
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const toastShownRef = useRef(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkToken = async () => {
            if (!token) {
                setIsValid(false);
                navigate('/login');
                return;
            }

            try {
                const res = await fetch('http://localhost:3500/api/protected', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await res.json();

                if (!data.valid) {
                    if (!toastShownRef.current) {
                        toast.error(data.message || 'Session expired', {
                            autoClose: 3000,
                        });
                        toastShownRef.current = true;
                    }
                    logout();
                    navigate('/login');
                    return;
                }

                setIsValid(true);
            } catch (error) {
                console.error('Token check failed:', error);
                logout();
                navigate('/login');
            }
        };

        checkToken();
        const intervalId = setInterval(checkToken, 102000);

        return () => clearInterval(intervalId);
    }, [token, logout, navigate]);

    if (isValid === null) {
        // Still checking
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p>Checking authentication...</p>
            </div>
        );
    }

    return <>{children}</>;
}

export default ProtectedRoute;
