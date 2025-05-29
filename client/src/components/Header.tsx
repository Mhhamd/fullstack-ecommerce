import { NavLink, Link, useNavigate } from 'react-router-dom';
import { CiShoppingCart, CiUser } from 'react-icons/ci';
import { FaExclamation, FaHome, FaShoppingBag } from 'react-icons/fa';
import { MdConnectWithoutContact } from 'react-icons/md';
import { IoCloseSharp } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { IoIosMenu } from 'react-icons/io';
import { useUser } from '../context/useUser';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const { token, user } = useUser();

    const navLinks = [
        { name: 'HOME', link: '/', icon: <FaHome /> },
        { name: 'SHOP ALL', link: '/shop-all', icon: <FaShoppingBag /> },
        { name: 'ABOUT', link: '/about', icon: <FaExclamation /> },
        {
            name: 'CONTACT',
            link: '/contact',
            icon: <MdConnectWithoutContact />,
        },
    ];

    const handleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    const handleUserClick = () => {
        if (token) {
            navigate(`/profile/${user?._id}`);
        } else {
            navigate('/login');
        }
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1023 && isMenuOpen) {
                setIsMenuOpen(false);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMenuOpen]);

    return (
        <>
            <div className="w-full bg-black py-3 text-center text-white uppercase text-[12px] sm:text-sm">
                <p>free domestic shipping on orders over $50*</p>
            </div>
            <div className="w-full flex items-center justify-between py-7 px-5 sm:px-10 bg-white border-b font-medium">
                {/* Left section */}
                <div className="flex-1 gap-6 items-center hidden lg:flex text-nowrap">
                    <ul className="flex gap-6">
                        {navLinks.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.link}
                                className="text-sm hover:text-black/60 transition-all duration-300 tracking-wide"
                            >
                                {item.name}
                                <hr className="w-0 mt-1 mx-auto border-none h-[1.5px] bg-gray-700 transition-all duration-300" />
                            </NavLink>
                        ))}
                    </ul>
                </div>

                {/* Side menu for phones */}
                <div
                    className={`fixed inset-0 z-[100] w-screen h-screen backdrop-blur-2xl bg-white/10 transition-all duration-300 ${
                        isMenuOpen
                            ? 'opacity-100'
                            : 'opacity-0 pointer-events-none'
                    }`}
                >
                    <div
                        className={`bg-white absolute right-0 top-0 h-full w-4/5 sm:w-96 shadow-2xl flex flex-col items-start gap-10 justify-center px-10 transition-transform duration-300 ${
                            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                    >
                        <div
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="absolute top-10 right-10 text-2xl hover:opacity-50 transition-all duration-300 cursor-pointer"
                        >
                            <IoCloseSharp />
                        </div>
                        {navLinks.map((item) => {
                            return (
                                <NavLink
                                    key={item.name}
                                    to={item.link}
                                    className="text-base flex items-center gap-4 hover:text-black/60 transition-all duration-300 tracking-wide"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <span className="text-xl">{item.icon}</span>
                                    <span className="leading-none">
                                        {item.name}
                                        <hr className="w-0 mt-1 mx-auto border-none h-[1.5px] bg-gray-700 transition-all duration-300" />
                                    </span>
                                </NavLink>
                            );
                        })}
                    </div>
                </div>

                {/* Middle section */}
                <div className="flex-none lg:flex-1 flex justify-center items-center hover:opacity-70 transition-all duration-300">
                    <Link to="/">
                        <h1 className="text-2xl sm:text-4xl font-poppins font-semibold tracking-wider">
                            MercadoX
                        </h1>
                    </Link>
                </div>

                {/* Right section */}
                <div className="flex-1 flex justify-end items-center gap-5 text-2xl">
                    {/* User */}
                    <div
                        onClick={handleUserClick}
                        className="hover:opacity-50 transition-all duration-300 cursor-pointer"
                    >
                        <CiUser />
                    </div>

                    {/* Cart */}
                    <div
                        onClick={handleCart}
                        className="relative hover:opacity-50 transition-all duration-300 cursor-pointer "
                    >
                        <CiShoppingCart />
                        <p
                            className="absolute right-[-7px] bottom-[-5px] w-4
                     text-center leading-4 bg-black text-white text-[8px] rounded-full"
                        >
                            0
                        </p>
                    </div>

                    {/* Cart sidebar */}
                    <div
                        onClick={handleCart}
                        className={`fixed inset-0 bg-black/50 z-[100] transition-all duration-300 ${
                            isCartOpen
                                ? 'opacity-100'
                                : 'opacity-0 pointer-events-none'
                        }`}
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className={`bg-white absolute right-0 top-0 h-full w-full sm:w-2/3 md:w-2/4 lg:w-2/6 xl:max-w-sm 2xl:max-w-lg transition-all duration-300 shadow-2xl p-10 flex items-start justify-start ${
                                isCartOpen
                                    ? 'translate-x-0 opacity-100'
                                    : 'translate-x-full opacity-0'
                            }`}
                        >
                            <div className="flex items-start w-full h-full flex-col">
                                <div className="flex items-center justify-between w-full">
                                    <h1 className="uppercase text-2xl tracking-wide">
                                        your cart
                                    </h1>
                                    <IoCloseSharp
                                        onClick={handleCart}
                                        className="text-2xl hover:opacity-50 transition-all duration-300 cursor-pointer"
                                    />
                                </div>
                                <div className="flex items-center justify-center w-full h-full">
                                    {!user ? (
                                        <p className="text-base text-gray-700">
                                            You are not logged in
                                        </p>
                                    ) : user.cart.length === 0 ? (
                                        <p className="text-base text-gray-700">
                                            You don't have items in your cart
                                        </p>
                                    ) : (
                                        // Render cart items here
                                        <p className="text-base text-gray-700">
                                            Cart items go here
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* menu for phones */}
                    <div
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="hover:opacity-50 transition-all duration-300 cursor-pointer block lg:hidden"
                    >
                        <IoIosMenu />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
