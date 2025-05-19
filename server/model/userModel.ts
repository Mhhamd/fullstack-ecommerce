import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    cart: [Object];
    date: Date;
}

const cartItemSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    name: String,
    price: Number,
    quantity: { type: Number, default: 1 },
    size: String,
    image: String,
});

const userSchema = new Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'user' },
    date: { type: Date, default: Date.now },
    cart: { type: [cartItemSchema], default: [] },
});

const User = mongoose.models.user || mongoose.model<IUser>('user', userSchema);

export default User;
