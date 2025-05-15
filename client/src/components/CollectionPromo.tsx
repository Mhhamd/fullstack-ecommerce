import { Link } from 'react-router-dom';

function CollectionPromo() {
    return (
        <div className="w-screen flex flex-col md:flex-row border">
            {/* Left section */}
            <div className="w-full md:w-1/2 border-b md:border-b-0 md:border-r">
                <img
                    className="w-full h-full object-cover"
                    src="/images/about.jpg"
                    alt="Promo"
                />
            </div>

            {/* Right section */}
            <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-10 md:py-20 md:px-20 ">
                <div className="bg-white w-full flex flex-col items-start justify-center">
                    <p className="uppercase text-lg md:text-base tracking-wide font-medium">
                        Make your business online.
                    </p>
                    <h1 className="uppercase my-5 tracking-wide text-3xl md:text-2xl lg:text-7xl">
                        Style that upgrade your collection
                    </h1>
                    <p className="text-gray-700 text-sm md:text-base">
                        If you are going to use a passage of{' '}
                        <br className="hidden md:block" /> Lorem Ipsum, you
                        need.
                    </p>
                    <Link className="mt-6" to="/shop-all">
                        <button className="bg-white border border-black text-black px-6 py-3 hover:bg-black hover:text-white transition-all duration-300 uppercase cursor-pointer">
                            Shop all
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CollectionPromo;
