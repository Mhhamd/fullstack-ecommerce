import { toast } from 'react-toastify';
import { type NavigateFunction } from 'react-router-dom';

function handleUnauthorized(
    res: Response,
    message: string,
    navigate: NavigateFunction,
    logout: () => void
): boolean {
    if (res.status === 401) {
        toast.error(message + ' Redirecting in 2 seconds', {
            autoClose: 2000,
        });
        setTimeout(() => {
            logout();
            navigate('/', { replace: true });
        }, 2000);
        return true;
    }
    return false;
}

export default handleUnauthorized;
