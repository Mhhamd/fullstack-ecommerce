interface CartItem {
    productId: string;
    quantity: number;
    price: number;
    image: string;
}

export default interface UserI {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    cart: CartItem[];
}
