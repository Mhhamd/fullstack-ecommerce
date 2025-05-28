import { useCallback, useEffect, useState } from 'react';
import ImageCard from '../shared/ImageCard';
import Title from '../shared/Title';
import type ProductI from '../shared/productType';
import { toast } from 'react-toastify';

function NewArrivals() {
    const [newArrivals, setNewArrivals] = useState<ProductI[] | null>(null);

    const getNewArrivals = useCallback(async () => {
        try {
            const res = await fetch(
                'http://localhost:3500/api/product/get-all-products'
            );
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
    }, []);

    useEffect(() => {
        getNewArrivals();
    }, [getNewArrivals]);
    // const newArrivalImage = [
    //     {
    //         showImage: '/images/newArrival1_show.jpg',
    //         hiddenImage: '/images/newArrival1_hidden.jpg',
    //         productName: `Men's regular casual trousers`,
    //         price: '65.00 USD',
    //         discount: '152.00 USD',
    //     },
    //     {
    //         showImage: '/images/newArrival2_show.jpg',
    //         hiddenImage: '/images/newArrival2_hidden.jpg',
    //         productName: `Design studio jali paper bag`,
    //         price: ' 43.00 USD',
    //         discount: '78.00 USD',
    //     },
    //     {
    //         showImage: '/images/newArrival3_show.jpg',
    //         hiddenImage: '/images/newArrival3_hidden.jpg',
    //         productName: `Pointy toe pumps for women`,
    //         price: ' 45.00 USD',
    //         discount: '65.00 USD',
    //     },
    //     {
    //         showImage: '/images/newArrival4_show.jpg',
    //         hiddenImage: '/images/newArrival4_hidden.jpg',
    //         productName: `Hojudo women’s high waist side`,
    //         price: '66.00 USD',
    //         discount: '78.00 USD',
    //     },
    // ];

    return (
        <div className=" w-screen pt-15 sm:px-10 px-5">
            <Title title="new arrivals" />
            <div className="flex items-center flex-col gap-8">
                <div className=" w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-y-3 border-black mt-7 ">
                    {newArrivals?.map((item) => {
                        return (
                            <div
                                key={item._id}
                                className="relative overflow-hidden group cursor-pointer w-full  "
                            >
                                <ImageCard
                                    productName={item.name}
                                    price={item.price}
                                    showImage={item.image[0]}
                                    hiddenImage={item.image[1]}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default NewArrivals;
