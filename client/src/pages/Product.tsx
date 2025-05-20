import BestSellers from '../components/Home/BestSellers';
import ProductBenefits from '../components/Product/ProductBenefits';
import ProductReviews from '../components/Product/ProductReviews';

function Product() {
    return (
        <>
            <div className=" w-screen pt-15 sm:px-10 px-5">
                <div className="flex items-start justify-between w-full gap-10 sticky top-5 lg:gap-20 lg:flex-row flex-col">
                    {/* Left section images */}
                    <div className="flex items-center flex-col gap-5 w-full">
                        <img
                            className="border cursor-pointer w-150 lg:w-full"
                            src="/images/bestSeller1_show.jpg"
                            alt=""
                        />
                        <img
                            className="border cursor-pointer  w-150 lg:w-full"
                            src="/images/bestSeller1_hidden.jpg"
                            alt=""
                        />
                    </div>

                    {/* Right section details */}
                    <div className="flex items-center flex-col w-full gap-5 pr-0 lg:pr-20 sticky top-5">
                        {/* Heading */}
                        <div className="flex items-start flex-col w-full">
                            <div>
                                <h1 className="text-5xl lg:text-6xl uppercase tracking-wide leading-18 font-medium">
                                    Women's Nylite Plus Sneakers
                                </h1>
                            </div>
                            <div className="flex items-center gap-6 mt-2">
                                <p className="text-2xl  font-medium">
                                    $ 65.00 USD
                                </p>
                                <p className=" text-lg line-through text-gray-600 font-light">
                                    $ 102.00 USD
                                </p>
                            </div>
                        </div>

                        {/* Add to cart container */}
                        <div className="flex items-start flex-col w-full gap-5 mt-5">
                            <div className="w-2/3">
                                <p className="tracking-wide text-sm">
                                    The point of using Lorem Ipsum is that it
                                    has a more-or-less normal distribution of
                                    letters, as opposed to using 'Content here,
                                    content here', making it look like readable
                                    English.
                                </p>
                            </div>
                            {/* Quantity */}
                            <div className="flex items-center justify-between border w-full lg:w-130 py-2 px-2 mt-5">
                                <div className="border w-16 ">
                                    <input
                                        type="number"
                                        defaultValue={1}
                                        min={1}
                                        className="w-full px-2 py-2 outline-0"
                                    />
                                </div>

                                {/* add to cart button */}
                                <div>
                                    <button className="uppercase tracking-wide border bg-black text-white text-center py-4 px-10 hover:bg-white hover:text-black cursor-pointer transition-all duration-300">
                                        add to cart
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Product Sub details */}
                        <div className="flex items-start w-full flex-col gap-3">
                            <div>
                                <p className="font-medium tracking-wide text-sm">
                                    Typically ships in 3-5 business days
                                </p>
                            </div>
                            <div className="mb-1">
                                <h1 className="uppercase font-medium text-2xl mb-1">
                                    material
                                </h1>
                                <p>
                                    Shell: 60% Polyester, 14% Elastane. Lining:
                                    100% Viscose.
                                </p>
                            </div>
                            <div className="mb-3">
                                <h1 className="uppercase font-medium text-2xl mb-2">
                                    Shipping
                                </h1>
                                <ul className="list-disc pl-5 space-y-4">
                                    <li>
                                        <span className="font-medium">
                                            United Kingdom, Belgium, France,
                                            Germany, Luxembourg, The
                                            Netherlands:
                                        </span>
                                        <br />
                                        Free shipping
                                    </li>
                                    <li>
                                        <span className="font-medium">
                                            Rest of Europe:
                                        </span>
                                        <br />
                                        Free over $300
                                    </li>
                                    <li>
                                        <span className="font-medium">
                                            United States and Rest of the world:
                                        </span>
                                        <br />
                                        $10 Standard Shipping
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h1 className="uppercase font-medium text-2xl mb-1">
                                    returns
                                </h1>
                                <p>
                                    It is a long established fact that a reader
                                    will be distracted by the readable content
                                    of a page when looking at its layout. The
                                    point of using Lorem Ipsum is that it has a
                                    more-or-less normal distribution of letters.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ProductBenefits />
            <ProductReviews />
            <div>
                <BestSellers />
            </div>
        </>
    );
}

export default Product;
