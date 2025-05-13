function Hero() {
    const currentYear = new Date().getFullYear();
    return (
        <div className="w-screen flex lg:flex-row flex-col overflow-hidden">
            {/* Left side */}
            <div className="flex justify-center flex-col  bg-black left-0 text-white top-0   w-screen px-15 pt-20 lg:w-1/2">
                <p className="text-left text-sm tracking-wide ">
                    #20K new ware
                </p>
                <h1 className="text-4xl leading-25  uppercase font-semibold text-left md:text-6xl">
                    All New Fashion <br /> in <br /> Summer {currentYear}
                </h1>
                <button
                    className="bg-white text-center text-black w-45 h-15 hover:bg-black hover:text-white transition-all duration-300 border border-white cursor-pointer mt-8
                     "
                >
                    SHOP NOW
                </button>
            </div>
            <div>
                {/* Hero image */}
                <img
                    className="object-center w-screen h-[110vh]    object-cover"
                    src="/images/hero-bg.jpg"
                    alt="herobackground"
                />
                {/* Left side */}
            </div>
        </div>
    );
}

export default Hero;
