import { useEffect } from 'react';
import ImageCard from '../shared/ImageCard';
import { useProduct } from '../../context/useProduct';
import type ProductI from '../shared/productType';

type Props = {
    products: ProductI[];
};

function Collection({ products }: Props) {
    const { getAllProducts } = useProduct();

    useEffect(() => {
        getAllProducts();
    }, [getAllProducts]);
    // const bestSellerImages = [
    //     {
    //         showImage: '/images/bestSeller1_show.jpg',
    //         hiddenImage: '/images/bestSeller1_hidden.jpg',
    //         productName: `Women's Nylite Plus Sneakers`,
    //         price: '65.00 USD',
    //         discount: '102.00 USD',
    //         category: 'men',
    //     },
    //     {
    //         showImage: '/images/bestSeller2_show.jpg',
    //         hiddenImage: '/images/bestSeller2_hidden.jpg',
    //         productName: `Women’s regular fit 100% cotton`,
    //         price: ' 40.00 USD',
    //         discount: '80.00 USD',
    //         category: 'women',
    //     },
    //     {
    //         showImage: '/images/bestSeller3_show.jpg',
    //         hiddenImage: '/images/bestSeller3_hidden.jpg',
    //         productName: `Falari baseball cap adjustable size`,
    //         price: ' 68.00 USD',
    //         discount: '95.00 USD',
    //         category: 'women',
    //     },
    //     {
    //         showImage: '/images/bestSeller4_show.jpg',
    //         hiddenImage: '/images/bestSeller4_hidden.jpg',
    //         productName: `Nora nico women's solid regular`,
    //         price: '40.00 USD',
    //         discount: '80.00 USD',
    //         category: 'women',
    //     },
    // ];
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-6 p-2">
                {products?.map((item) => {
                    return (
                        <div
                            key={item._id}
                            className="relative overflow-hidden group cursor-pointer w-full"
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
    );
}

export default Collection;
