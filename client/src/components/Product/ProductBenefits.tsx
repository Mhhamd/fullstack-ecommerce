function ProductBenefits() {
    const benefitsData = [
        {
            title: 'PREMIUM MATERIALS',
            benefit:
                'Crafted with high-quality, breathable fabrics that offer all-day comfort while maintaining durability and a polished look.',
        },
        {
            title: 'DESIGNED FOR MOVEMENT',
            benefit: `Engineered with a modern fit that moves with you — whether you're on the go, at work, or relaxing — without compromising on style.`,
        },
        {
            title: ' MADE TO LAST',
            benefit: `Built with attention to detail and reinforced stitching to ensure long-lasting wear, even after countless washes.`,
        },
    ];
    return (
        <div className=" w-screen pt-15 sm:px-10 px-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 ">
                {benefitsData.map((item) => {
                    return (
                        <div
                            className="border p-13 flex flex-col items-start"
                            key={item.title}
                        >
                            <img
                                className="w-13"
                                src="/icons/check.svg"
                                alt="checkmark"
                            />
                            <h1 className="uppercase text-2xl font-medium mt-5 mb-3 ">
                                {item.title}
                            </h1>
                            <p className="tracking-wide">{item.benefit}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ProductBenefits;
