import { Link } from 'react-router-dom';
import ImageCard from '../shared/ImageCard';
import Title from '../shared/Title';
import { useCallback, useEffect, useState } from 'react';
import type ProductI from '../shared/productType';
import { toast } from 'react-toastify';

function BestSellers() {
    const [bestSellers, setBestSellers] = useState<ProductI[] | null>(null);

    // const bestSellerImages = [
    //     {
    //         showImage: '/images/bestSeller1_show.jpg',
    //         hiddenImage: '/images/bestSeller1_hidden.jpg',
    //         productName: `Women's Nylite Plus Sneakers`,
    //         price: '65.00 USD',
    //         discount: '102.00 USD',
    //     },
    //     {
    //         showImage: '/images/bestSeller2_show.jpg',
    //         hiddenImage: '/images/bestSeller2_hidden.jpg',
    //         productName: `Women’s regular fit 100% cotton`,
    //         price: ' 40.00 USD',
    //         discount: '80.00 USD',
    //     },
    //     {
    //         showImage: '/images/bestSeller3_show.jpg',
    //         hiddenImage: '/images/bestSeller3_hidden.jpg',
    //         productName: `Falari baseball cap adjustable size`,
    //         price: ' 68.00 USD',
    //         discount: '95.00 USD',
    //     },
    //     {
    //         showImage: '/images/bestSeller4_show.jpg',
    //         hiddenImage: '/images/bestSeller4_hidden.jpg',
    //         productName: `Nora nico women's solid regular`,
    //         price: '40.00 USD',
    //         discount: '80.00 USD',
    //     },
    // ];
    const getBestSellers = useCallback(async () => {
        try {
            const res = await fetch(
                'http://localhost:3500/api/product/get-all-products'
            );
            const data = await res.json();
            if (!res.ok) {
                toast.error(data.message || 'Something went wrong');
                return;
            }
            const filteredProducts = data.products
                .filter((item: ProductI) => item.bestSeller)
                .slice(0, 4);
            setBestSellers(filteredProducts);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        getBestSellers();
    }, [getBestSellers]);
    return (
        <div className=" w-screen pt-15 sm:px-10 px-5">
            <Title title="Best Sellers" />
            <div className="flex items-center flex-col gap-8">
                <div className=" w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-y-3 border-black mt-7 ">
                    {bestSellers?.map((product: ProductI) => {
                        return (
                            <Link
                                to={`/product/${product._id}`}
                                key={product._id}
                                className="relative overflow-hidden group cursor-pointer w-full  "
                            >
                                <ImageCard
                                    productName={product.name}
                                    price={product.price}
                                    showImage={product.image[0]}
                                    hiddenImage={product.image[1]}
                                />
                            </Link>
                        );
                    })}
                </div>
                <Link to={'/shop-all'}>
                    <button
                        className="bg-white border text-center text-black w-40 h-15 hover:bg-black hover:text-white transition-all duration-300  cursor-pointer active:bg-black active:text-white
                     "
                    >
                        SHOP ALL
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default BestSellers;
