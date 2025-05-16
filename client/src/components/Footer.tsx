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
                        <li className="hover:opacity-50">HOME</li>
                        <li>HOME 2</li>
                        <li>SHOP ALL</li>
                        <li>ABOUT</li>
                        <li>BLOG</li>
                        <li>CONTACT</li>
                        <li>FAQS</li>
                    </ul>
                </div>

                {/* Template Info */}
                <div className="border-r-0 md:border-r  h-full p-10 sm:py-10 border-b md:border-b-0">
                    <h2 className="text-lg font-semibold mb-4 uppercase">
                        Template Info
                    </h2>
                    <ul className="space-y-1">
                        <li>STYLE GUIDE</li>
                        <li>LICENSES</li>
                        <li>CHANGELOG</li>
                    </ul>
                </div>

                {/* Social */}
                <div className="p-10 sm:py-10 ">
                    <h2 className="text-lg font-semibold mb-4 uppercase">
                        Social
                    </h2>
                    <ul className="space-y-1">
                        <li>FACEBOOK</li>
                        <li>INSTAGRAM</li>
                        <li>PINTEREST</li>
                        <li>LINKEDIN</li>
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
