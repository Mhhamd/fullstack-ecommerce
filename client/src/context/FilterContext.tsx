import { createContext } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface FilterContextType {
    selectedCategories: string[];
    selectedSubCategories: string[];
    filteredProducts: any[];
    handleCategoryChange: (category: string) => void;
    handleSubCategoryChange: (subCategory: string) => void;
    handleFilterMenu: () => void;
    filterMenu: boolean;
}

export const FilterContext = createContext<FilterContextType | undefined>(
    undefined
);
