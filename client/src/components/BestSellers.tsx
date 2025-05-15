import { Link } from 'react-router-dom';
import ImageCard from './shared/ImageCard';
import Title from './shared/Title';

function BestSellers() {
    const bestSellerImages = [
        {
            showImage: '/images/bestSeller1_show.jpg',
            hiddenImage: '/images/bestSeller1_hidden.jpg',
            productName: `Women's Nylite Plus Sneakers`,
            price: '65.00 USD',
            discount: '102.00 USD',
        },
        {
            showImage: '/images/bestSeller2_show.jpg',
            hiddenImage: '/images/bestSeller2_hidden.jpg',
            productName: `Women’s regular fit 100% cotton`,
            price: ' 40.00 USD',
            discount: '80.00 USD',
        },
        {
            showImage: '/images/bestSeller3_show.jpg',
            hiddenImage: '/images/bestSeller3_hidden.jpg',
            productName: `Falari baseball cap adjustable size`,
            price: ' 68.00 USD',
            discount: '95.00 USD',
        },
        {
            showImage: '/images/bestSeller4_show.jpg',
            hiddenImage: '/images/bestSeller4_hidden.jpg',
            productName: `Nora nico women's solid regular`,
            price: '40.00 USD',
            discount: '80.00 USD',
        },
    ];

    return (
        <div className=" w-screen pt-15 sm:px-10 px-5">
            <Title title="Best Sellers" />
            <div className="flex items-center flex-col gap-8">
                <div className=" w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-y-3 border-black mt-7 ">
                    {bestSellerImages.map((item) => {
                        return (
                            <div
                                key={item.productName}
                                className="relative overflow-hidden group cursor-pointer w-full  "
                            >
                                <ImageCard
                                    productName={item.productName}
                                    price={item.price}
                                    discount={item.discount}
                                    showImage={item.showImage}
                                    hiddenImage={item.hiddenImage}
                                />
                            </div>
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
