import { Link } from 'react-router-dom';
import Title from './shared/Title';
import {
    MouseParallaxContainer,
    MouseParallaxChild,
} from 'react-parallax-mouse';

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
        <div className=" w-screen pt-15 sm:px-10 px-5">
            <Title title="top category" showButton={true} />
            <div className="flex w-full items-center justify-center border-black mt-7 lg:flex-row flex-col">
                {topCategoryImages.map((item) => {
                    return (
                        <Link className="w-full" key={item.category} to={'/'}>
                            <MouseParallaxContainer
                                globalFactorX={0.1}
                                globalFactorY={0.1}
                                className="flex-1 relative overflow-hidden group cursor-pointer"
                            >
                                {/* Blur overlay */}
                                <div className="absolute inset-0 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-600 z-10"></div>

                                {/* Sliding Text */}
                                <MouseParallaxChild
                                    factorX={1.5}
                                    factorY={1}
                                    className="absolute inset-0 flex items-center justify-center z-20"
                                >
                                    <span className="text-black text-2xl uppercase tracking-wide opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-600 border rounded-full w-32 h-32 flex items-center justify-center">
                                        {item.category}
                                    </span>
                                </MouseParallaxChild>

                                {/* Image */}
                                <img
                                    className={`${item.className}`}
                                    src={item.image}
                                    alt={item.category}
                                />
                            </MouseParallaxContainer>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

export default TopCategory;
