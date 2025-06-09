import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className=" w-screen pt-15 pb-15 sm:px-10 px-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  text-sm text-black border h-full">
                {/* Contact */}
                <div className="border-r-0 md:border-r  h-full p-10 sm:py-10 border-b lg:border-b-0">
                    <h2 className="text-lg font-semibold mb-4 uppercase">
                        Contact
                    </h2>
                    <p>
                        1810 Stone Canyon Rd Longmont,
                        <br />
                        Colorado(CO), 80503
                    </p>
                    <p className="mt-3">Info@gmail.com</p>
                    <p className="mt-1">+9 144 4784 4576</p>
                </div>

                {/* Pages */}
                <div className="border-r-0 lg:border-r h-full p-10 sm:py-10 border-b lg:border-b-0  ">
                    <h2 className="text-lg font-semibold mb-4 uppercase">
                        Pages
                    </h2>
                    <ul className="space-y-1 ">
                        <li className="hover:opacity-50 transition-all duration-300">
                            <Link to="/">HOME</Link>
                        </li>
                        <li className="hover:opacity-50 transition-all duration-300">
                            <Link to="/shop-all">SHOP ALL</Link>
                        </li>
                        <li className="hover:opacity-50 transition-all duration-300">
                            <Link to="/about">ABOUT</Link>
                        </li>
                        <li className="hover:opacity-50 transition-all duration-300">
                            <Link to="/contact">CONTACT</Link>
                        </li>
                    </ul>
                </div>

                {/* My Account */}
                <div className="border-r-0 md:border-r  h-full p-10 sm:py-10 border-b md:border-b-0">
                    <h2 className="text-lg font-semibold mb-4 uppercase">
                        My Account
                    </h2>
                    <ul className="space-y-1">
                        <li className="hover:opacity-50 transition-all duration-300">
                            <Link to="/login">Login</Link>
                        </li>
                        <li className="hover:opacity-50 transition-all duration-300">
                            <Link to="/register">Register</Link>
                        </li>
                    </ul>
                </div>

                {/* Social */}
                <div className="p-10 sm:py-10 ">
                    <h2 className="text-lg font-semibold mb-4 uppercase">
                        Social
                    </h2>
                    <ul className="space-y-1">
                        <li className="hover:opacity-50 transition-all duration-300 cursor-pointer">
                            FACEBOOK
                        </li>
                        <li className="hover:opacity-50 transition-all duration-300 cursor-pointer">
                            INSTAGRAM
                        </li>
                        <li className="hover:opacity-50 transition-all duration-300 cursor-pointer">
                            PINTEREST
                        </li>
                        <li className="hover:opacity-50 transition-all duration-300 cursor-pointer">
                            LINKEDIN
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="text-center py-4  border border-t-0 tracking-normal sm:tracking-wider">
                <p>© All rights reserved by MercadoX.</p>
            </div>
        </footer>
    );
}

export default Footer;
