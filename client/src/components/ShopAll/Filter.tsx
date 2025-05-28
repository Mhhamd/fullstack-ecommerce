import { useEffect, useState } from 'react';
import Title from '../shared/Title';
import Collection from './Collection';
import { FaArrowRight } from 'react-icons/fa';
import { useProduct } from '../../context/useProduct';

function Filter() {
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
    const filteredProducts = products.filter((product) => {
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
