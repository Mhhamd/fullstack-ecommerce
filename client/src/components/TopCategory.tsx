import Title from './Title';

function TopCategory() {
    const topCategoryImages = [
        {
            image: '/images/category_men.jpg',
            category: 'Men',
            className:
                'object-center object-cover  w-full border sm:border-r sm:border-r-2',
        },
        {
            image: '/images/category_women.jpg',
            category: 'Women',
            className:
                'object-center object-cover  w-full border sm:border-r sm:border-r-2',
        },
        {
            image: '/images/category_shoes.jpg',
            category: 'Shoes',
            className:
                'object-center object-cover w-full border sm:border-r-0 ',
        },
    ];

    return (
        <div className=" w-screen py-15 sm:px-10 px-5">
            <Title title="top category" showButton={true} />
            <div className="flex w-full items-center justify-center border border-black mt-7 sm:flex-row flex-col">
                {topCategoryImages.map((item) => {
                    return (
                        <div
                            key={item.category}
                            className="flex-1 relative overflow-hidden group cursor-pointer"
                        >
                            {/* Blur overlay */}
                            <div className="absolute inset-0 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-600 z-10"></div>

                            {/* Sliding Text */}
                            <div className="absolute inset-0 flex items-center justify-center z-20">
                                <span className="text-black/60 text-2xl font-bold opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-600">
                                    {item.category}
                                </span>
                            </div>

                            {/* Image */}
                            <img
                                className={item.className}
                                src={item.image}
                                alt={item.category}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default TopCategory;
