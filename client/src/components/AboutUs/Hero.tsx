import { motion } from 'framer-motion';

function Hero() {
    return (
        <div className="w-screen">
            <div className="w-full relative sm:h-[90vh] h-[50vh]">
                <img
                    className="w-full h-full object-cover object-center "
                    src="/images/aboutUs-bg.jpg"
                    alt="ss"
                />
                <div className="absolute inset-0 mx-auto flex items-center justify-center bg-black/70 ">
                    <motion.h1
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                        className="text-white text-2xl md:text-6xl uppercase text-center leading-normal md:leading-20 font-semibold"
                    >
                        Curating only the best{' '}
                        <br className="md:block hidden" /> things for you.
                    </motion.h1>
                </div>
            </div>
        </div>
    );
}

export default Hero;
