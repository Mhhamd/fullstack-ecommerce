function StorySection() {
    return (
        <div className="flex items-center justify-center flex-col pt-15 px-4 md:px-0">
            {/* Heading Section */}
            <div className="text-center w-full md:w-2/3">
                <h2 className="uppercase text-base font-semibold md:font-normal md:text-2xl tracking-wider">
                    Our Story
                </h2>
                <h3 className="uppercase text-xl md:text-4xl font-medium tracking-wide mt-3">
                    We are a team of creative and passionate minds to take
                    fashion to the next level.
                </h3>
            </div>

            {/* Content Section */}
            <div className="flex flex-col md:flex-row items-start justify-between gap-8 w-full sm:w-2/2 lg:w-2/3 md:px-16 mt-12">
                {/* Left Column */}
                <div className="md:w-1/2 px-2 md:px-5">
                    <p>
                        All the Lorem Ipsum generators on the Internet tend to
                        repeat predefined chunks as necessary making this the
                        first true generator on the Internet.
                    </p>
                    <p className="mt-3 mb-6">
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking at its layout. The point of using Lorem Ipsum is
                        that it has a more-or-less normal distribution of
                        letters, as opposed to using 'Content here, content
                        here', making it look like readable English.
                    </p>
                    <img
                        src="/images/signature.png"
                        alt="signature"
                        className="w-32"
                    />
                </div>

                {/* Right Column */}
                <div className="md:w-1/2 px-2 md:px-5">
                    <img
                        src="/images/aboutUs.jpg"
                        alt="About us"
                        className="w-full h-auto rounded-lg object-cover"
                    />
                </div>
            </div>
        </div>
    );
}

export default StorySection;
