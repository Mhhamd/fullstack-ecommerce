import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import handleUnauthorized from '../utils/unauthorizedHandler';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

interface ProductI {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string[];
    category: string;
    subCategory: string;
    sizes: string[];
    bestSeller: boolean;
    date: Date;
}

function All_Items() {
    const [products, setProducts] = useState<ProductI[] | null>(null);
    const navigate = useNavigate();
    const { logout, token, getProduct } = useAuth();

    const getProducts = useCallback(async () => {
        try {
            const res = await fetch(
                'http://localhost:3500/api/product/get-all-products'
            );
            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || 'Something went wrong');
                return;
            }
            setProducts(data.products);
        } catch (error) {
            toast.error('Failed to get the products');
            console.error(error);
        }
    }, []);

    const handleDelete = async (id: string) => {
        try {
            const res = await fetch(
                `http://localhost:3500/api/product/delete/${id}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await res.json();
            const handled = handleUnauthorized(
                res,
                data.message,
                navigate,
                logout
            );
            if (handled) return;

            if (!res.ok) {
                toast.error(data.message || 'Something went wrong');
                return;
            }
            getProducts();
            toast.success('Product deleted successfully', { autoClose: 2000 });
        } catch (error) {
            toast.error('Failed to delete the product');
            console.error(error);
        }
    };

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    return (
        <div className="w-full p-10 flex items-start gap-5 flex-col ">
            <h1 className="flex items-start text-gray-700 font-bold">
                All Product Items
            </h1>
            <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 border bg-gray-200 text-gray-900 text-sm w-full px-2">
                <b>Image</b>
                <b>Name</b>
                <b>Category</b>
                <b>Price</b>
                <b className="text-center">Action</b>
            </div>
            {products === null ? (
                <p className="text-gray-500 text-2xl">Loading products...</p>
            ) : products.length === 0 ? (
                <p className="text-gray-500 text-2xl">No products available</p>
            ) : (
                products?.map((item) => {
                    return (
                        <div
                            key={item._id}
                            className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center  border bg-gray-200 text-gray-900 text-sm w-full px-2 py-3"
                        >
                            <img
                                className="w-20 h-full object-cover object-center"
                                src={item.image[0]}
                                alt={item.name}
                            />
                            <h1 className="text-gray-700 font-semibold">
                                {item.name}
                            </h1>
                            <h1 className="text-gray-700 font-semibold">
                                {item.category}
                            </h1>
                            <h1 className="text-gray-700 font-semibold">
                                ${item.price}
                            </h1>
                            <div className="flex items-center flex-col gap-5">
                                <button
                                    onClick={() => {
                                        handleDelete(item._id);
                                    }}
                                    className="text-white font-semibold bg-red-600 py-2 px-5 rounded-2xl hover:cursor-pointer hover:opacity-50 transition-all duration-300"
                                >
                                    Delete
                                </button>
                                <Link
                                    onClick={() => getProduct(item)}
                                    to={`/update/${item._id}`}
                                    className="text-white font-semibold bg-black py-2 px-5 rounded-2xl hover:cursor-pointer hover:opacity-50 transition-all duration-300"
                                >
                                    Update
                                </Link>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}

export default All_Items;
