import type { JSX } from 'react';
import { useAuth } from '../context/useAuth';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: JSX.Element;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isAuthenticated, user } = useAuth();
    if (!isAuthenticated || !user || user.role !== 'admin') {
        return <Navigate to={'/'} replace />;
    }
    return children;
}

export default ProtectedRoute;
