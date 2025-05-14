function Hero() {
    const currentYear = new Date().getFullYear();
    return (
        <div className="w-screen flex flex-col lg:flex-row overflow-hidden">
            {/* Left side */}
            <div className="flex justify-center items-center sm:items-start flex-col bg-black left-0 text-white top-0 px-20 pt-10 pb-10 sm:pt-20">
                <p className="text-left text-sm tracking-wide ">
                    #20K new ware
                </p>
                <h1 className="text-2xl sm:text-6xl leading-10 sm:leading-25  uppercase font-semibold text-center sm:text-left  ">
                    All New Fashion <br className="hidden lg:block" /> in{' '}
                    <br className="hidden sm:block" />
                    Summer {currentYear}
                </h1>
                <button
                    className="bg-white text-center text-black w-45 h-15 hover:bg-black hover:text-white transition-all duration-300 border border-white cursor-pointer mt-8 active:bg-black active:text-white
                     "
                >
                    SHOP NOW
                </button>
            </div>
            <div>
                {/* Hero image */}
                <img
                    className="object-center object-cover w-screen h-[80vh] sm:h-[110vh]"
                    src="/images/hero-bg.jpg"
                    alt="herobackground"
                />
                {/* Left side */}
            </div>
        </div>
    );
}

export default Hero;
