import { useContext } from 'react';
import { FilterContext, type FilterContextType } from './FilterContext';

function useFilter(): FilterContextType {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error('useFilter must be used within FilterProvider');
    }
    return context;
}

export default useFilter;
