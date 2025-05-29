import { createContext } from 'react';
import type ProductI from '../types/productType';

export interface ProductContextType {
    products: ProductI[];
    getAllProducts: () => void;
    getProduct: (product: ProductI) => void;
    currentProduct: ProductI | null;
}

export const ProductContext = createContext<ProductContextType | undefined>(
    undefined
);
