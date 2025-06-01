import { NavLink, Link, useNavigate } from 'react-router-dom';
import { CiShoppingCart, CiUser } from 'react-icons/ci';
import { FaExclamation, FaHome, FaShoppingBag } from 'react-icons/fa';
import { MdConnectWithoutContact } from 'react-icons/md';
import { IoCloseSharp } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { IoIosLogOut, IoIosMenu } from 'react-icons/io';
import { useUser } from '../context/useUser';
import type { CartItem } from '../types/userType';
import { toast } from 'react-toastify';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();
    const { token, user, updateUser, logout } = useUser();

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

    const calculateTotal = () => {
        if (user) {
            const total = user.cart.reduce(
                (acc, item) => acc + item.quantity * item.price,
                0
            );
            return total;
        }
    };

    const handleProductDelete = async (cartItemId: string) => {
        setIsLoading(true);
        try {
            const res = await fetch(
                'http://localhost:3500/api/user/remove-from-cart',
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        cartItemId,
                        userId: user?._id,
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || 'Something went wrong');
                return;
            }

            toast.success('Product deleted');
            updateUser(data.updatedUser);
        } catch (error) {
            console.error(error);
            toast.error('an error occurred when deleting the product');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1023 && isMenuOpen) {
                setIsMenuOpen(false);
            }
        };
        if (isCartOpen) {
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        } else {
            document.body.style.position = '';
            document.body.style.width = '';
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            document.body.style.position = '';
            document.body.style.width = '';
        };
    }, [isMenuOpen, isCartOpen]);

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

                    <div className="flex items-center gap-5">
                        {user ? null : (
                            <CiUser
                                onClick={() => navigate('/login')}
                                className="hover:opacity-50 transition-all duration-300 cursor-pointer "
                            />
                        )}

                        {user ? (
                            <IoIosLogOut
                                onClick={() => {
                                    logout();
                                    navigate('/login');
                                }}
                                className="hover:opacity-50 transition-all duration-300 cursor-pointer "
                            />
                        ) : null}
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
                            {user ? user.cart.length : 0}
                        </p>
                    </div>

                    {/* Cart sidebar */}
                    <div
                        onClick={() => {
                            handleCart();
                            setError('');
                        }}
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
                                        onClick={() => {
                                            handleCart();
                                            setError('');
                                        }}
                                        className="text-2xl hover:opacity-50 transition-all duration-300 cursor-pointer"
                                    />
                                </div>
                                <div className="flex items-center justify-center w-full h-full pr-5">
                                    {!user ? (
                                        <p className="text-base text-gray-700">
                                            You are not logged in
                                        </p>
                                    ) : user.cart.length === 0 ? (
                                        <p className="text-base text-gray-700">
                                            You don't have items in your cart
                                        </p>
                                    ) : (
                                        // Render cart items
                                        <div
                                            style={{
                                                overflowY: 'auto',
                                                scrollbarWidth: 'thin',
                                                scrollbarGutter: 'stable',
                                            }}
                                            className="w-full flex items-start flex-col gap-5 mt-10 h-full pb-10 "
                                        >
                                            {user.cart.map(
                                                (item: CartItem, index) => {
                                                    return (
                                                        <div
                                                            key={index}
                                                            className={`flex flex-col sm:flex-row items-start gap-3 sm:gap-5 w-full border py-3 px-3 rounded-lg ${
                                                                isLoading
                                                                    ? 'opacity-50'
                                                                    : ''
                                                            }`}
                                                        >
                                                            {/* Product Image */}
                                                            <div className="w-full sm:w-20 flex-shrink-0">
                                                                <img
                                                                    className="w-full h-auto sm:w-20 sm:h-20 object-cover"
                                                                    src={
                                                                        item.image
                                                                    }
                                                                    alt={
                                                                        item.name
                                                                    }
                                                                />
                                                            </div>

                                                            {/* Product Info */}
                                                            <div className="flex-1 w-full">
                                                                <h4 className="text-black text-lg tracking-wide capitalize">
                                                                    {item.name}
                                                                </h4>
                                                                <div className="mt-1">
                                                                    <p className="font-light text-sm">
                                                                        ${' '}
                                                                        {
                                                                            item.price
                                                                        }
                                                                        .00 USD
                                                                    </p>
                                                                    <p className="font-normal text-sm sm:text-base">
                                                                        Size:{' '}
                                                                        {
                                                                            item.size
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <button
                                                                    disabled={
                                                                        isLoading
                                                                    }
                                                                    onClick={() =>
                                                                        handleProductDelete(
                                                                            item._id
                                                                        )
                                                                    }
                                                                    className={`text-sm sm:text-base bg-white border p-1 hover:bg-black hover:text-white transition-all duration-300 mt-2 sm:mt-3 ${
                                                                        isLoading
                                                                            ? 'opacity-50 cursor-not-allowed'
                                                                            : 'cursor-pointer'
                                                                    }`}
                                                                >
                                                                    Remove
                                                                </button>
                                                            </div>

                                                            {/* Quantity */}
                                                            <div className="self-start">
                                                                <input
                                                                    disabled
                                                                    type="number"
                                                                    value={
                                                                        item.quantity
                                                                    }
                                                                    className="w-10 sm:w-12 text-sm py-2 rounded-lg text-center bg-black text-white"
                                                                />
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                            )}
                                            <div className="flex items-center text-center flex-col  w-full mx-auto">
                                                <div className="flex items-center justify-between w-full">
                                                    <p className="text-lg font-light">
                                                        Subtotal
                                                    </p>
                                                    <p className="text-lg font-medium">
                                                        ${calculateTotal()}.00
                                                        USD
                                                    </p>
                                                </div>
                                                {user.cart.length > 0 && (
                                                    <button
                                                        onClick={() =>
                                                            setError(
                                                                'Checkout is disabled on this site.'
                                                            )
                                                        }
                                                        className="w-full border py-3 font-light text-lg  mt-5 hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
                                                    >
                                                        Continue to Checkout
                                                    </button>
                                                )}
                                                {error && user ? (
                                                    <p className="text-base self-start text-left px-3 bg-[#ffdede] w-full mt-3 py-2">
                                                        Checkout is disabled on
                                                        this site.
                                                    </p>
                                                ) : (
                                                    ''
                                                )}
                                            </div>
                                        </div>
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
