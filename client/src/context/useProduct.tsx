import { useContext } from 'react';
import { ProductContext, type ProductContextType } from './ProductContext';

export const useProduct = (): ProductContextType => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useAuth must be used within an ProductProvider');
    }
    return context;
};
