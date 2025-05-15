function NewsLetter() {
    return (
        <form className="w-full pt-24">
            <div className="w-full flex items-center justify-center bg-black text-white py-20 px-4 flex-col">
                <div className="mb-10 max-w-3xl">
                    <h1 className="text-2xl md:text-4xl font-semibold text-center uppercase">
                        Sign up & on your first order &{' '}
                        <br className="hidden md:block" /> get 10% off. Stay
                        updated with us.
                    </h1>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-xl space-y-4 md:space-y-0 ">
                    <input
                        className="h-12 w-full border border-white px-5 outline-none placeholder:text-white bg-black"
                        placeholder="your@email.com"
                        type="email"
                        required
                    />
                    <button
                        type="submit"
                        className="h-12 w-full md:w-auto bg-white text-black px-6 md:px-10 border border-white hover:text-white hover:bg-black cursor-pointer transition-all duration-300 active:bg-black active:text-white uppercase"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </form>
    );
}

export default NewsLetter;
