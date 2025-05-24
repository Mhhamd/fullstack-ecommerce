import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

function Header() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    return (
        <div className="w-screen border-b border-gray-500">
            <div className="w-full flex items-center justify-between px-10 py-5">
                <h1 className="logo text-3xl font-medium tracking-wider">
                    MercadoX
                </h1>
                <button
                    onClick={() => {
                        logout();
                        navigate('/', { replace: true });
                    }}
                    className="bg-black py-2 px-5 text-white border cursor-pointer rounded-4xl hover:bg-white hover:text-black transition-all duration-300"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Header;
