import Title from '../shared/Title';
import Collection from './Collection';
import { FaArrowRight } from 'react-icons/fa';
import useFilter from '../../context/useFilter';

function Filter() {
    const {
        handleFilterMenu,
        filterMenu,
        handleSubCategoryChange,
        handleCategoryChange,
        filteredProducts,
        selectedCategories,
    } = useFilter();

    return (
        <div className="flex items-start justify-between md:flex-row flex-col gap-4">
            {/* Title */}
            <div className="flex items-start flex-col ">
                <div className="flex items-center gap-2 mb-2">
                    <Title title="filters" />
                    <FaArrowRight
                        onClick={handleFilterMenu}
                        className="md:hidden block cursor-pointer"
                    />
                </div>
                {filterMenu && (
                    <div className="flex items-start gap-5 flex-col ">
                        {/* Categories */}
                        <div className="flex flex-col gap-2 border border-gray-700 pl-7 pr-24 py-4">
                            <p className="uppercase text-center font-medium tracking-wide text-sm mb-2">
                                categories
                            </p>
                            <div className="flex gap-2 items-center">
                                <input
                                    onChange={() => handleCategoryChange('men')}
                                    value={'men'}
                                    checked={selectedCategories.includes('men')}
                                    type="checkbox"
                                    id="men"
                                />
                                <label
                                    htmlFor="men"
                                    className="text-sm text-gray-700"
                                >
                                    Men
                                </label>
                            </div>
                            <div className="flex gap-2 items-center">
                                <input
                                    onChange={() =>
                                        handleCategoryChange('women')
                                    }
                                    checked={selectedCategories.includes(
                                        'women'
                                    )}
                                    value={'women'}
                                    type="checkbox"
                                    id="women"
                                />
                                <label
                                    htmlFor="women"
                                    className="text-sm text-gray-700"
                                >
                                    Women
                                </label>
                            </div>
                            <div className="flex gap-2 items-center">
                                <input
                                    onChange={() =>
                                        handleCategoryChange('kids')
                                    }
                                    checked={selectedCategories.includes(
                                        'kids'
                                    )}
                                    value={'kids'}
                                    type="checkbox"
                                    id="kids"
                                />
                                <label
                                    htmlFor="kids"
                                    className="text-sm text-gray-700"
                                >
                                    Kids
                                </label>
                            </div>
                        </div>

                        {/* Sub category */}
                        <div className="flex flex-col gap-2 border border-gray-700 pl-7 pr-19 py-4">
                            <p className="uppercase text-center font-medium tracking-wide text-sm mb-2">
                                sub category
                            </p>
                            <div className="flex gap-2 items-center">
                                <input
                                    value={'topwear'}
                                    onChange={() =>
                                        handleSubCategoryChange('topwear')
                                    }
                                    type="checkbox"
                                    id="topwear"
                                />
                                <label
                                    htmlFor="topwear"
                                    className="text-sm text-gray-700"
                                >
                                    Topwear
                                </label>
                            </div>
                            <div className="flex gap-2 items-center">
                                <input
                                    value={'bottomwear'}
                                    onChange={() =>
                                        handleSubCategoryChange('bottomwear')
                                    }
                                    type="checkbox"
                                    id="bottomwear"
                                />
                                <label
                                    htmlFor="bottomwear"
                                    className="text-sm text-gray-700"
                                >
                                    Bottomwear
                                </label>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {/* Filter Section */}

            <div className="flex items-start flex-col">
                <div className="flex justify-between w-full px-5 ">
                    <Title title="All collection" />
                    {/* <Title title="All collection" /> */}
                </div>
                <Collection products={filteredProducts} />
            </div>
        </div>
    );
}

export default Filter;
