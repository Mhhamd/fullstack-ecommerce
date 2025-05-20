import Title from '../shared/Title';

function ProductReviews() {
    const reviewData = [
        {
            title: 'Perfect Fit & Super Comfy',
            user: 'Ava Johnson.',
            verified: 'Verified Buyer',
            review: 'This shirt fits exactly how I like — not too tight, not too loose. The fabric feels soft and breathable, and the color hasn’t faded even after multiple washes. Definitely buying another one!',
        },
        {
            title: 'Stylish and Durable',
            user: 'Liam Carter.',
            verified: 'Verified Buyer',
            review: 'Was surprised by how well-made this jacket is. The stitching is solid and the material feels premium. I’ve gotten a lot of compliments on it already — worth every penny!',
        },
        {
            title: 'My New Go-To Pants',
            user: 'Sophia Kim.',
            verified: 'Verified Buyer',
            review: 'I wear these almost every day now. Super comfortable for work or casual wear. They stretch just enough and hold their shape perfectly. Highly recommend.',
        },
        {
            title: 'Exactly What I Was Looking For',
            user: 'Noah Martinez. ',
            verified: 'Verified Buyer',
            review: 'The quality exceeded my expectations. It looks just like the photos, feels great on the skin, and fits true to size. Shipping was fast too — will definitely shop here again.',
        },
    ];
    return (
        <div className=" w-full lg:w-250 mx-auto pt-15 sm:px-10 px-5">
            <div className="flex items-center w-full flex-col gap-5">
                {/* Title */}
                <div className="flex items-center justify-between w-full sm:flex-row flex-col mb-5">
                    <Title title="customer reviews" />
                    <h1 className="text-lg font-medium">
                        5.0 based on 4 reviews
                    </h1>
                </div>
                {reviewData.map((item) => {
                    return (
                        <div
                            key={item.title}
                            className="flex items-start flex-col w-full border p-12"
                        >
                            <h1 className="font-medium tracking-wide text-lg mb-3">
                                {item.title}
                            </h1>
                            <img
                                className="w-30 mb-3"
                                src="/icons/star.svg"
                                alt=""
                            />
                            <h2 className="font-medium mb-5">
                                {item.user}{' '}
                                <span className="font-light">
                                    {item.verified}
                                </span>
                            </h2>
                            <p>{item.review}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ProductReviews;
