export default interface ProductI {
    _id: string;
    name: string;
    description: string;
    price: string;
    image: string[];
    category: string;
    subCategory: string;
    sizes: string[];
    bestSeller: boolean;
}
