interface ImageProps {
    showImage: string;
    hiddenImage: string;
    productName: string;
    price: string;
}

function ImageCard({ showImage, hiddenImage, productName, price }: ImageProps) {
    return (
        <div className="group relative w-full rounded-2xl overflow-hidden shadow-md border border-gray-200 bg-white hover:shadow-lg transition-shadow duration-300">
            <div className="relative w-full aspect-[3/4]">
                <img
                    src={showImage}
                    alt={productName}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0 z-10"
                />
                <img
                    src={hiddenImage}
                    alt={`${productName} alternate`}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                    {productName}
                </h2>
                <p className="text-sm text-gray-500 mt-1">${price}</p>
            </div>
        </div>
    );
}

export default ImageCard;
