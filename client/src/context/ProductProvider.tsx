import { useCallback, useState } from 'react';
import type ProductI from '../components/shared/productType';
import { toast } from 'react-toastify';
import { ProductContext } from './ProductContext';

type Props = {
    children: React.ReactNode;
};

export const ProductProvider = ({ children }: Props) => {
    const [products, setProducts] = useState<ProductI[]>([]);

    const getAllProducts = useCallback(async () => {
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
            console.error(error);
            toast.error('Failed to fetch products');
        }
    }, []);
    return (
        <ProductContext.Provider value={{ getAllProducts, products }}>
            {children}
        </ProductContext.Provider>
    );
};
