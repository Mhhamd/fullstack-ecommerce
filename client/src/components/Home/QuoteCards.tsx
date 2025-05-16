function QuoteCards() {
    const quotes = [
        {
            quote: 'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially un-changed It was popularised.',
            author: 'Anton Woodward',
            job: '— Business Director',
        },
        {
            quote: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as sites still in their infancy will uncover.',
            author: 'Journey Nixon',
            job: '— Head of Marketing',
        },
        {
            quote: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for.',
            author: 'Desiree Jarvis',
            job: '— Founder',
        },
    ];

    return (
        <div className="w-screen pt-15 ">
            <div className="w-full border flex flex-col md:flex-row items-stretch">
                {quotes.map((item, index) => (
                    <div
                        key={index}
                        className={`
                            bg-white flex items-center justify-center flex-col
                            px-6 py-10 md:px-10 md:py-20
                            w-full md:w-1/3
                            border-b md:border-b-0
                            ${index < quotes.length - 1 ? 'md:border-r-2' : ''}
                            border-black
                        `}
                    >
                        <div className="flex items-start gap-2">
                            <img
                                className="w-5"
                                src="/images/quote.png"
                                alt="quote"
                            />
                            <p className="text-center tracking-wide text-sm">
                                {item.quote}
                            </p>
                        </div>
                        <div className="flex items-center  flex-col gap-3 mt-5">
                            <h1 className=" text-xl font-medium uppercase tracking-wide">
                                {item.author}
                            </h1>
                            <p>{item.job}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default QuoteCards;
