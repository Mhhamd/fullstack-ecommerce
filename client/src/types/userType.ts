export interface CartItem {
    name: string;
    size: string;
    productId: string;
    quantity: number;
    price: number;
    image: string;
    _id: string;
}

export default interface UserI {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    cart: CartItem[];
}
