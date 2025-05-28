import { createContext } from 'react';
import type ProductI from '../components/shared/productType';

export interface ProductContextType {
    products: ProductI[];
    getAllProducts: () => void;
}

export const ProductContext = createContext<ProductContextType | undefined>(
    undefined
);
