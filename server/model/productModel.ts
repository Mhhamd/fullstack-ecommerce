import { Schema, Document } from 'mongoose';
import mongoose from 'mongoose';

interface IPrdocut extends Document {
    name: string;
    description: string;
    price: number;
    hasDiscount: boolean;
    discount: number;
    image: string[];
    category: string;
    subCategory: string;
    sizes: string[];
    bestSeller: boolean;
    date: Date;
}

const productSchema = new Schema<IPrdocut>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    hasDiscount: { type: Boolean, required: true },
    discount: {
        type: Number,
        validate: {
            validator: function (this: IPrdocut, value: number) {
                if (this.hasDiscount) {
                    return value !== undefined && value > 0;
                }
                return true;
            },
        },
        message:
            'Discount must be provided and greater than 0 if hasDiscount is true',
    },
    image: { type: [String], required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    sizes: { type: [String], required: true },
    bestSeller: { type: Boolean, required: true },
    date: { type: Date, required: true, default: Date.now() },
});

const Product =
    mongoose.models.product ||
    mongoose.model<IPrdocut>('product', productSchema);

export default Product;
