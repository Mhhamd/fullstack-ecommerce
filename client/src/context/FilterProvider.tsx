import { useEffect, useState } from 'react';
import type ProductI from '../types/productType';
import { useProduct } from './useProduct';
import { FilterContext } from './FilterContext';

type Props = {
    children: React.ReactNode;
};

export const FilterProvider = ({ children }: Props) => {
    const [filterMenu, setFilterMenu] = useState<boolean>(false);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedSubCategories, setSelectedSubCategories] = useState<
        string[]
    >([]);
    const { products } = useProduct();

    const handleSubCategoryChange = (subCategory: string) => {
        setSelectedSubCategories((prev) =>
            prev.includes(subCategory)
                ? prev.filter((s) => s !== subCategory)
                : [...prev, subCategory]
        );
    };
    const filteredProducts = products.filter((product: ProductI) => {
        const matchesCategory =
            selectedCategories.length === 0 ||
            selectedCategories.includes(product.category.toLowerCase());

        const matchesSubCategory =
            selectedSubCategories.length === 0 ||
            selectedSubCategories.includes(product.subCategory.toLowerCase());

        return matchesCategory && matchesSubCategory;
    });

    const handleCategoryChange = (category: string) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
    };

    const handleFilterMenu = () => {
        setFilterMenu(!filterMenu);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setFilterMenu(true);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [filterMenu]);

    return (
        <FilterContext.Provider
            value={{
                handleFilterMenu,
                handleCategoryChange,
                handleSubCategoryChange,
                filterMenu,
                filteredProducts,
                selectedCategories,
                selectedSubCategories,
            }}
        >
            {children}
        </FilterContext.Provider>
    );
};
