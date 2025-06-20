import { Link } from 'react-router-dom';
import ImageCard from '../shared/ImageCard';
import Title from '../shared/Title';
import { useCallback, useEffect, useState } from 'react';
import type ProductI from '../../types/productType';
import { toast } from 'react-toastify';
import { useProduct } from '../../context/useProduct';

function BestSellers() {
    const [bestSellers, setBestSellers] = useState<ProductI[] | null>(null);
    const { getProduct } = useProduct();
    const API_BASE = import.meta.env.VITE_API_URL;

    const getBestSellers = useCallback(async () => {
        try {
            const res = await fetch(`${API_BASE}/api/product/get-all-products`);
            const data = await res.json();
            if (!res.ok) {
                toast.error(data.message || 'Something went wrong');
                return;
            }
            const filteredProducts = data.products
                .filter((item: ProductI) => item.bestSeller)
                .slice(-4);
            setBestSellers(filteredProducts);
        } catch (error) {
            console.error(error);
        }
    }, [API_BASE]);

    useEffect(() => {
        getBestSellers();
    }, [getBestSellers]);
    return (
        <div className=" w-screen pt-15 sm:px-10 px-5">
            <Title title="Best Sellers" />
            <div className="flex items-center flex-col gap-8">
                <div className=" w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-y-3 gap-x-4 border-black mt-7 ">
                    {bestSellers?.map((product: ProductI) => {
                        return (
                            <Link
                                onClick={() => getProduct(product)}
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
