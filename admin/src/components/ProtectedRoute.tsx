import { useEffect, useState, type JSX } from 'react';
import { useAuth } from '../context/useAuth';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface ProtectedRouteProps {
    children: JSX.Element;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { token, logout } = useAuth();
    const [isValid, setIsValid] = useState<boolean | null>(null);

    useEffect(() => {
        const checkToken = async () => {
            if (!token) {
                setIsValid(false);
                return;
            }

            try {
                const res = await fetch('http://localhost:3500/api/protected', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await res.json();
                if (!data.valid) toast.error(data.message);
                setIsValid(data.valid);
            } catch (error) {
                console.error(error);
                setIsValid(false);
            }
        };
        checkToken();

        const intervalId = setInterval(checkToken, 102000);

        const handleCloseTab = () => {
            logout();
        };

        window.addEventListener('beforeunload', handleCloseTab);
        return () => {
            clearInterval(intervalId);
            window.removeEventListener('beforeunload', handleCloseTab);
        };
    }, [token, logout]);

    if (isValid === null) return <div>Loading...</div>;

    if (isValid === false) return <Navigate to={'/'} replace />;

    return children;
}

export default ProtectedRoute;
