import { FaCloudUploadAlt } from 'react-icons/fa';
import { useAuth } from '../context/useAuth';
import { useEffect, useState, type FormEvent } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Update() {
    const { currentProduct, token } = useAuth();
    const [name, setName] = useState<string>('');
    const [category, setCategory] = useState<string>('Men');
    const [subCategory, setSubCategory] = useState<string>('Topwear');
    const [price, setPrice] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [bestSeller, setBestSeller] = useState<boolean>(false);
    const [sizes, setSizes] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const API_BASE = import.meta.env.VITE_API_URL;

    useEffect(() => {
        if (currentProduct) {
            setName(currentProduct.name || '');
            setCategory(currentProduct.category || 'Men');
            setSubCategory(currentProduct.subCategory || 'Topwear');
            setPrice(currentProduct.price?.toString() || '');
            setDescription(currentProduct.description || '');
            setBestSeller(currentProduct.bestSeller || false);
            setSizes(currentProduct.sizes || []);
        }
    }, [currentProduct]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!name || !price || !description || sizes.length === 0) {
            toast.warn('Please fill in all required fields');
            setIsLoading(false);
            return;
        }

        const formData = new FormData();
        setIsLoading(true);

        formData.append('name', name);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('subCategory', subCategory);
        formData.append('price', price);
        formData.append('bestSeller', JSON.stringify(bestSeller));
        formData.append('sizes', JSON.stringify(sizes));
        try {
            const res = await fetch(
                `${API_BASE}/api/product/update/${currentProduct?._id}`,
                {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                }
            );

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || 'Something went wrong');
                return;
            }

            toast.success('Product updated successfully');
            setTimeout(() => {
                navigate('/all-items');
                setTimeout(() => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                    });
                }, 500);
            }, 2000);
        } catch (error) {
            console.error(error);
            toast.error('Unexpected server response.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-10 w-full flex items-center">
            <div>
                <h2 className="text-lg font-semibold mb-4 text-gray-700">
                    Product Image
                </h2>

                {/* Images */}
                <div className="flex gap-4">
                    {currentProduct?.image.map((file, index) => (
                        <label
                            key={index}
                            className="w-24 h-24 border-2 border-dashed border-gray-300 flex items-center justify-center rounded relative overflow-hidden  transition-all duration-300"
                        >
                            {file ? (
                                <img
                                    src={file}
                                    alt={`Upload ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="flex flex-col items-center text-gray-400">
                                    <FaCloudUploadAlt className="w-6 h-6 mb-1" />
                                    <span className="text-sm">Upload</span>
                                </div>
                            )}
                        </label>
                    ))}
                </div>

                {/* Inputs */}
                <div className="flex items-start flex-col w-full mt-10">
                    {/* Product name */}
                    <div className="flex flex-col">
                        <label
                            className="text-lg font-semibold mb-4 text-gray-700"
                            htmlFor="name"
                        >
                            Product Name
                        </label>
                        <input
                            value={name || currentProduct?.name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full max-w-[500px] px-3 py-2 border border-gray-500 rounded-lg outline-none focus:border-black transition-all duration-300 capitalize"
                            id="name"
                            type="text"
                        />
                    </div>

                    {/* Product category and price */}

                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8 mt-8">
                        <div>
                            <p className="mb-2">Product category</p>
                            <select
                                value={category || currentProduct?.category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-3 py-2"
                            >
                                <option value="Men">Men</option>
                                <option value="Women">Women</option>
                                <option value="Kids">Kids</option>
                            </select>
                        </div>
                        <div>
                            <p className="mb-2">Sub category</p>
                            <select
                                value={
                                    subCategory || currentProduct?.subCategory
                                }
                                onChange={(e) => setSubCategory(e.target.value)}
                                className="w-full px-3 py-2"
                            >
                                <option value="Topwear">Topwear</option>
                                <option value="Bottomwear">Bottomwear</option>
                            </select>
                        </div>
                        <div>
                            <p className="mb-2">Product Price</p>
                            <input
                                value={price || currentProduct?.price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full px-3 py-2 sm:w-[120px] border border-gray-500 rounded-lg outline-none focus:border-black  transition-all duration-300 "
                                type="number"
                                placeholder="25"
                            />
                        </div>
                    </div>

                    {/* Product description */}
                    <div className="flex flex-col w-full mt-8">
                        <label
                            className="text-lg font-semibold mb-4 text-gray-700"
                            htmlFor="description"
                        >
                            Product Description
                        </label>
                        <textarea
                            value={description || currentProduct?.description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="h-[15vh] px-3 py-2 border border-gray-500 rounded-lg outline-none focus:border-black  transition-all duration-300 capitalize"
                            id="description"
                        ></textarea>
                    </div>

                    {/* Product sizes */}
                    <div className="flex gap-3 mt-5">
                        {/* Small size */}
                        <div
                            className={` ${
                                sizes.includes('S')
                                    ? 'bg-black text-white'
                                    : 'bg-white/50'
                            } cursor-pointer`}
                            onClick={() => {
                                setSizes((prev) =>
                                    prev.includes('S')
                                        ? prev.filter((item) => item !== 'S')
                                        : [...prev, 'S']
                                );
                            }}
                        >
                            <p className="px-3 py-1 border">S</p>
                        </div>

                        {/* Medium size */}
                        <div
                            className={` ${
                                sizes.includes('M')
                                    ? 'bg-black text-white'
                                    : 'bg-white/50'
                            } cursor-pointer`}
                            onClick={() => {
                                setSizes((prev) =>
                                    prev.includes('M')
                                        ? prev.filter((item) => item !== 'M')
                                        : [...prev, 'M']
                                );
                            }}
                        >
                            <p className="px-3 py-1 border">M</p>
                        </div>

                        {/* Large size */}
                        <div
                            className={` ${
                                sizes.includes('L')
                                    ? 'bg-black text-white'
                                    : 'bg-white/50'
                            } cursor-pointer`}
                            onClick={() => {
                                setSizes((prev) =>
                                    prev.includes('L')
                                        ? prev.filter((item) => item !== 'L')
                                        : [...prev, 'L']
                                );
                            }}
                        >
                            <p className="px-3 py-1 border">L</p>
                        </div>

                        {/* X Large size */}
                        <div
                            className={` ${
                                sizes.includes('XL')
                                    ? 'bg-black text-white'
                                    : 'bg-white/50'
                            } cursor-pointer`}
                            onClick={() => {
                                setSizes((prev) =>
                                    prev.includes('XL')
                                        ? prev.filter((item) => item !== 'XL')
                                        : [...prev, 'XL']
                                );
                            }}
                        >
                            <p className="px-3 py-1 border">XL</p>
                        </div>

                        {/* XX Large size */}
                        <div
                            className={` ${
                                sizes.includes('XXL')
                                    ? 'bg-black text-white'
                                    : 'bg-white/50'
                            } cursor-pointer`}
                            onClick={() => {
                                setSizes((prev) =>
                                    prev.includes('XXL')
                                        ? prev.filter((item) => item !== 'XXL')
                                        : [...prev, 'XXL']
                                );
                            }}
                        >
                            <p className="px-3 py-1 border">XXL</p>
                        </div>
                    </div>

                    {/* Product bestseller */}
                    <div className="flex gap-2 mt-5">
                        <input
                            checked={bestSeller}
                            onChange={() => setBestSeller(!bestSeller)}
                            id="bestseller"
                            type="checkbox"
                        />
                        <label htmlFor="bestseller">Best Seller</label>
                    </div>
                </div>
                <button
                    disabled={isLoading}
                    type="submit"
                    className={`bg-black text-white border py-3 px-10 mt-5 hover:bg-white hover:text-black transition-all duration-300  ${
                        isLoading
                            ? 'opacity-50 cursor-not-allowed'
                            : 'cursor-pointer'
                    }`}
                >
                    Update
                </button>
            </div>
        </form>
    );
}

export default Update;
