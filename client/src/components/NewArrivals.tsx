import ImageCard from './shared/ImageCard';
import Title from './shared/Title';

function NewArrivals() {
    const newArrivalImage = [
        {
            showImage: '/images/newArrival1_show.jpg',
            hiddenImage: '/images/newArrival1_hidden.jpg',
            productName: `Men's regular casual trousers`,
            price: '65.00 USD',
            discount: '152.00 USD',
        },
        {
            showImage: '/images/newArrival2_show.jpg',
            hiddenImage: '/images/newArrival2_hidden.jpg',
            productName: `Design studio jali paper bag`,
            price: ' 43.00 USD',
            discount: '78.00 USD',
        },
        {
            showImage: '/images/newArrival3_show.jpg',
            hiddenImage: '/images/newArrival3_hidden.jpg',
            productName: `Pointy toe pumps for women`,
            price: ' 45.00 USD',
            discount: '65.00 USD',
        },
        {
            showImage: '/images/newArrival4_show.jpg',
            hiddenImage: '/images/newArrival4_hidden.jpg',
            productName: `Hojudo women’s high waist side`,
            price: '66.00 USD',
            discount: '78.00 USD',
        },
    ];

    return (
        <div className=" w-screen pt-15 sm:px-10 px-5">
            <Title title="new arrivals" />
            <div className="flex items-center flex-col gap-8">
                <div className=" w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-y-3 border-black mt-7 ">
                    {newArrivalImage.map((item) => {
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
            </div>
        </div>
    );
}

export default NewArrivals;
