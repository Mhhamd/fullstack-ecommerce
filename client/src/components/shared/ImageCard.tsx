interface ImageProps {
    showImage: string;
    hiddenImage: string;
    productName: string;
    price: string;
}

function ImageCard({ showImage, hiddenImage, productName, price }: ImageProps) {
    return (
        <div className="border-black  ">
            <img
                src={showImage}
                className="group-hover:opacity-0 absolute z-10 transition-all duration-600 border w-full "
            />
            <img className="border w-full " src={hiddenImage} />
            <div className=" bg-white border px-6 h-25 flex items-start justify-center flex-col">
                <h1 className="md:text-lg text-base  font-semibold tracking-wider">
                    {productName}
                </h1>
                <div className="flex items-center text-nowrap gap-4 mt-2">
                    <p className="md:text-[15px] text-[12px] text-gray-700 font-medium">
                        $ {price}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ImageCard;
