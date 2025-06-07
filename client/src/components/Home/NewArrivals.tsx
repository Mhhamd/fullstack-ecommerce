import { useCallback, useEffect, useState } from 'react';
import ImageCard from '../shared/ImageCard';
import Title from '../shared/Title';
import type ProductI from '../../types/productType';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useProduct } from '../../context/useProduct';

function NewArrivals() {
    const [newArrivals, setNewArrivals] = useState<ProductI[] | null>(null);
    const { getProduct } = useProduct();
    const API_BASE = import.meta.env.VITE_API_URL;

    const getNewArrivals = useCallback(async () => {
        try {
            const res = await fetch(`${API_BASE}/api/product/get-all-products`);
            const data = await res.json();
            if (!res.ok) {
                toast.error(data.message || 'Something went wrong');
                return;
            }
            const filteredProducts = data.products.slice(-4);
            setNewArrivals(filteredProducts);
        } catch (error) {
            console.error(error);
        }
    }, [API_BASE]);

    useEffect(() => {
        getNewArrivals();
    }, [getNewArrivals]);

    return (
        <div className=" w-screen pt-15 sm:px-10 px-5">
            <Title title="new arrivals" />
            <div className="flex items-center flex-col gap-8">
                <div className=" w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-y-3 gap-x-4 border-black mt-7 ">
                    {newArrivals?.map((item) => {
                        return (
                            <Link
                                onClick={() => getProduct(item)}
                                to={`/product/${item._id}`}
                                key={item._id}
                                className="relative overflow-hidden group cursor-pointer w-full  "
                            >
                                <ImageCard
                                    productName={item.name}
                                    price={item.price}
                                    showImage={item.image[0]}
                                    hiddenImage={item.image[1]}
                                />
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default NewArrivals;
