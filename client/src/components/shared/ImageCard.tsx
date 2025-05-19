interface ImageProps {
    showImage: string;
    hiddenImage: string;
    productName: string;
    price: string;
    discount: string;
}

function ImageCard({
    showImage,
    hiddenImage,
    productName,
    price,
    discount,
}: ImageProps) {
    return (
        <div className="border-black  ">
            <img
                src={showImage}
                className="group-hover:opacity-0 absolute z-10 transition-all duration-600 border w-full "
            />
            <img className="border w-full " src={hiddenImage} />
            <div className=" bg-white border px-6 h-32 flex items-start justify-center flex-col">
                <h1 className="md:text-lg text-base tracking-wide ">
                    {productName}
                </h1>
                <div className="flex items-center text-nowrap gap-4 mt-2">
                    <p className="md:text-[15px] text-[12px] text-black font-light">
                        $ {price}
                    </p>
                    <p className="line-through text-gray-600 text-[12px]">
                        $ {discount}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ImageCard;
