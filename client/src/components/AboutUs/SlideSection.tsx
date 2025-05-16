import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function SlideSection() {
    const settings = {
        dots: false,
        pauseOnHover: false,
        infinite: true,
        slidesToShow: 3,
        autoplay: true,
        speed: 5000,
        autoplaySpeed: 5000,
        adaptiveHeight: true,
        draggable: false,
        swipe: false,
        responsive: [
            {
                breakpoint: 1024, // tablets and below
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 600, // mobile landscape
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const images = [
        { image: '/images/model_1.jpg' },
        { image: '/images/model_2.jpg' },
        { image: '/images/model_3.jpg' },
        { image: '/images/model_4.jpg' },
        { image: '/images/model_5.jpg' },
        { image: '/images/model_6.jpg' },
        { image: '/images/model_7.jpg' },
        { image: '/images/model_8.jpg' },
        { image: '/images/model_9.jpg' },
        { image: '/images/model_10.jpg' },
    ];

    return (
        <div className="pt-15 mt-10 px-4 md:px-20 max-w-screen-xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="uppercase text-xl md:text-2xl font-medium hover:underline cursor-pointer">
                    @ mercadoX
                </h1>
                <h1 className="uppercase text-xl md:text-2xl font-medium">
                    instagram
                </h1>
            </div>

            {/* Slider */}
            <Slider {...settings} className="slider-container">
                {images.map((item) => (
                    <div key={item.image} className="px-2">
                        <div className="h-[50vh] md:h-[60vh] border overflow-hidden rounded-lg">
                            <img
                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                loading="lazy"
                                src={item.image}
                                alt={item.image}
                            />
                        </div>
                        <p className="text-center mt-2 text-sm md:text-base">
                            @ mercadoX
                        </p>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default SlideSection;
