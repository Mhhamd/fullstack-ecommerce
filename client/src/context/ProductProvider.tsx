import { useCallback, useState } from 'react';
import type ProductI from '../types/productType';
import { toast } from 'react-toastify';
import { ProductContext } from './ProductContext';

type Props = {
    children: React.ReactNode;
};
const API_BASE = import.meta.env.VITE_API_URL;

export const ProductProvider = ({ children }: Props) => {
    const [products, setProducts] = useState<ProductI[]>([]);
    const [currentProduct, setCurrentProduct] = useState<ProductI | null>(
        () => {
            const productData = localStorage.getItem('currentProduct');
            return productData ? JSON.parse(productData) : null;
        }
    );

    const getAllProducts = useCallback(async () => {
        try {
            const res = await fetch(`${API_BASE}/api/product/get-all-products`);
            const data = await res.json();
            if (!res.ok) {
                toast.error(data.message || 'Something went wrong');
                return;
            }
            setProducts(data.products);
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch products');
        }
    }, []);

    const getProduct = async (product: ProductI) => {
        setCurrentProduct(product);
        localStorage.setItem('currentProduct', JSON.stringify(product));
    };
    return (
        <ProductContext.Provider
            value={{ getAllProducts, products, getProduct, currentProduct }}
        >
            {children}
        </ProductContext.Provider>
    );
};
