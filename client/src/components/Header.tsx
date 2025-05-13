import { NavLink, Link } from 'react-router-dom';
import { CiSearch, CiShoppingCart, CiUser } from 'react-icons/ci';
import { FaExclamation, FaHome, FaShoppingBag } from 'react-icons/fa';
import { MdConnectWithoutContact } from 'react-icons/md';
import { IoCloseSharp } from 'react-icons/io5';
import { useState } from 'react';
import { IoIosMenu } from 'react-icons/io';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

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

    return (
        <div className="w-full flex items-center justify-between py-7 px-10 bg-white border-b font-medium">
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
                    isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
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
                    <h1 className="text-4xl font-poppins font-semibold tracking-wider">
                        MercadoX
                    </h1>
                </Link>
            </div>

            {/* Right section */}
            <div className="flex-1 flex justify-end items-center gap-5 text-2xl">
                <CiSearch className="hover:opacity-50 transition-all duration-300 cursor-pointer" />
                <Link
                    className="hover:opacity-50 transition-all duration-300"
                    to={'/login'}
                >
                    <CiUser />
                </Link>
                <Link
                    to={'/cart'}
                    className="relative hover:opacity-50 transition-all duration-300 "
                >
                    <CiShoppingCart />
                    <p
                        className="absolute right-[-7px] bottom-[-5px] w-4
                     text-center leading-4 bg-black text-white text-[8px] rounded-full"
                    >
                        0
                    </p>
                </Link>
                <div
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="hover:opacity-50 transition-all duration-300 cursor-pointer block lg:hidden"
                >
                    <IoIosMenu />
                </div>
            </div>
        </div>
    );
}

export default Header;
