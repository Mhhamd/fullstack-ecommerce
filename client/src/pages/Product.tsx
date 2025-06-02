import { useState, type FormEvent } from 'react';
import BestSellers from '../components/Home/BestSellers';
import ProductBenefits from '../components/Product/ProductBenefits';
import ProductReviews from '../components/Product/ProductReviews';
import { useProduct } from '../context/useProduct';
import { toast } from 'react-toastify';
import { useUser } from '../context/useUser';
import { useNavigate } from 'react-router-dom';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import 'yet-another-react-lightbox/styles.css';

function Product() {
    const { currentProduct } = useProduct();
    const { user, updateUser, logout, isAuthenticated, token } = useUser();

    const [open, setOpen] = useState<boolean>(false);
    const [photoIndex, setPhotoIndex] = useState<number>(0);

    const [size, setSize] = useState<string>('');
    const [quantity, setQuantity] = useState<string>('1');
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        if (!size) {
            setError('Please select a size');
            return;
        }
        if (Number(quantity) <= 0) {
            setError('Quantity must be at least 1');
            return;
        }
        if (!isAuthenticated) {
            toast.error('You must be logged in', { autoClose: 3000 });
            navigate('/login');
            return;
        }

        setIsLoading(true);

        try {
            const res = await fetch(
                'http://localhost:3500/api/user/add-to-cart',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        size,
                        quantity,
                        userId: user?._id,
                        productId: currentProduct?._id,
                    }),
                }
            );
            const data = await res.json();

            if (res.status === 401) {
                toast.error('Session expired', { autoClose: 3000 });
                setTimeout(() => {
                    logout();
                    navigate('/login');
                }, 3500);
                return;
            }

            if (!res.ok) {
                toast.error(data.message || 'Something went wrong', {
                    autoClose: 3000,
                });
                return;
            }
            updateUser(data.updatedUser);
            toast.success('Product added successfully.', { autoClose: 3000 });
        } catch (error) {
            console.error(error);
            toast.error('Failed to add the product to the cart', {
                autoClose: 3000,
            });
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <>
            {!currentProduct && (
                <div className="text-center text-2xl mt-10">
                    Product not found.
                </div>
            )}
            <form
                onSubmit={handleSubmit}
                className=" w-screen pt-15 sm:px-10 px-5"
            >
                <div className="flex items-start justify-between w-full gap-10 sticky top-5 lg:gap-20 lg:flex-row flex-col">
                    {/* Left section images */}
                    <div className="flex items-center flex-col gap-5 w-full">
                        {currentProduct?.image.map((imageURL, idx) => {
                            return (
                                <div key={imageURL}>
                                    <img
                                        onClick={() => {
                                            setOpen(true);
                                            setPhotoIndex(idx);
                                        }}
                                        className="border cursor-pointer w-150 lg:w-full"
                                        src={imageURL}
                                        alt=""
                                    />
                                </div>
                            );
                        })}
                        <Lightbox
                            open={open}
                            close={() => setOpen(false)}
                            index={photoIndex}
                            plugins={[Zoom, Thumbnails]}
                            slides={currentProduct?.image.map((src) => ({
                                src,
                            }))}
                            thumbnails={{
                                position: 'bottom', // Position thumbnails at the bottom
                                width: 80, // Thumbnail width
                                height: 60, // Thumbnail height
                                borderRadius: 4, // Border radius
                                padding: 4, // Padding around thumbnails
                                gap: 8, // Gap between thumbnails
                                border: 0,
                            }}
                        />
                    </div>

                    {/* Right section details */}
                    <div className="flex items-center flex-col w-full gap-5 pr-0 lg:pr-20 sticky top-5">
                        {/* Heading */}
                        <div className="flex items-start flex-col w-full">
                            <div>
                                <h1 className="text-5xl lg:text-6xl uppercase tracking-wide leading-18 font-medium">
                                    {currentProduct?.name}
                                </h1>
                            </div>
                            <div className="flex items-center gap-6 mt-2">
                                <p className="text-2xl  font-medium">
                                    $ {currentProduct?.price}.00 USD
                                </p>
                            </div>
                        </div>

                        {/* Add to cart container */}
                        <div className="flex items-start flex-col w-full gap-5 mt-5">
                            <div className="w-2/3">
                                <p className="tracking-wide text-sm">
                                    {currentProduct?.description}
                                </p>
                            </div>
                            {/* Quantity */}
                            <div className="flex sm:items-center items-start justify-between sm:flex-row flex-col border w-full lg:w-130 py-2 px-2 mt-5">
                                <div className=" flex sm:flex-row flex-col items-start  sm:items-center gap-3 ">
                                    <div>
                                        <input
                                            value={quantity}
                                            onChange={(e) =>
                                                setQuantity(e.target.value)
                                            }
                                            type="number"
                                            min={1}
                                            className="w-16 px-2 border py-2 outline-0"
                                        />
                                    </div>
                                    <div className="border">
                                        <select
                                            value={size}
                                            onChange={(e) =>
                                                setSize(e.target.value)
                                            }
                                            className="w-full px-5 py-2"
                                        >
                                            <option value="" disabled hidden>
                                                Select Size
                                            </option>
                                            <option value="S">S</option>
                                            <option value="M">M</option>
                                            <option value="L">L</option>
                                            <option value="XL">XL</option>
                                            <option value="XXL">XXL</option>
                                        </select>
                                    </div>
                                </div>

                                {/* add to cart button */}
                                <div>
                                    <button
                                        disabled={isLoading}
                                        type="submit"
                                        className={`uppercase tracking-wide border bg-black text-white text-center sm:mt-0 mt-5 py-4 px-10 hover:bg-white hover:text-black transition-all duration-300 ${
                                            isLoading
                                                ? 'opacity-50 cursor-not-allowed '
                                                : 'cursor-pointer'
                                        }`}
                                    >
                                        add to cart
                                    </button>
                                </div>
                            </div>
                            {error && (
                                <p className="text-red-600 text-3xl tracking-wide ">
                                    {error}
                                </p>
                            )}
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
            </form>
            <ProductBenefits />
            <ProductReviews />
            <div>
                <BestSellers />
            </div>
        </>
    );
}

export default Product;
