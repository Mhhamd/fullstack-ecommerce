import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    cart: [Object];
    date: Date;
}

const userSchema = new Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now },
    cart: { type: [Object], default: [] },
});

const User = mongoose.models.user || mongoose.model<IUser>('user', userSchema);

export default User;
