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
    const API_BASE = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const checkToken = async () => {
            if (!token) {
                setIsValid(false);
                return;
            }

            try {
                const res = await fetch(`${API_BASE}/api/protected`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await res.json();
                if (!data.valid) {
                    toast.error(data.message);
                    logout();
                }
                setIsValid(data.valid);
            } catch (error) {
                console.error(error);
                setIsValid(false);
            }
        };
        checkToken();

        const intervalId = setInterval(checkToken, 102000);

        const handleCloseTab = () => {
            const navEntry = performance.getEntriesByType(
                'navigation'
            )[0] as PerformanceNavigationTiming;
            const isReload = navEntry.type === 'reload';

            if (!isReload) logout();
        };

        window.addEventListener('beforeunload', handleCloseTab);
        return () => {
            clearInterval(intervalId);
            window.removeEventListener('beforeunload', handleCloseTab);
        };
    }, [token, logout, API_BASE]);

    if (isValid === null) return <div>Loading...</div>;

    if (isValid === false) return <Navigate to={'/'} replace />;

    return children;
}

export default ProtectedRoute;
