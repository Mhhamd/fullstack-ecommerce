import { Request, Response } from 'express';
import User from '../model/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import Product from '../model/productModel';

const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        if (!email) {
            res.status(400).json({
                success: false,
                message: 'Email is required',
            });
            return;
        }
        if (!password) {
            res.status(400).json({
                success: false,
                message: 'Password is required',
            });
            return;
        }

        const normalizedEmail = email.trim().toLowerCase();
        const existingUser = await User.findOne({ email: normalizedEmail });
        if (!existingUser) {
            res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
            return;
        }

        const passwordMatch = await bcrypt.compare(
            password,
            existingUser.password
        );
        if (!passwordMatch) {
            res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
            return;
        }

        const tokenSecret = process.env.TOKEN_SECRET;
        if (!tokenSecret) {
            throw new Error(
                'TOKEN_SECRET is not defined in environment variables'
            );
        }

        const token = jwt.sign(
            { _id: existingUser._id, role: existingUser.role },
            tokenSecret,
            {
                expiresIn: '100s',
            }
        );
        res.status(200)
            .header('Authorization', `Bearer ${token}`)
            .json({
                success: true,
                message: 'Login successful',
                token,
                user: {
                    _id: existingUser._id,
                    name: existingUser.name,
                    email: existingUser.email,
                    role: existingUser.role,
                },
            });
    } catch (error) {
        res.status(500).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : 'Internal server error',
        });
    }
};

const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName) {
            res.status(400).json({
                success: false,
                message: 'First name is required',
            });
            return;
        }
        if (!lastName) {
            res.status(400).json({
                success: false,
                message: 'Last name is required',
            });
            return;
        }
        if (!email) {
            res.status(400).json({
                success: false,
                message: 'Email is required',
            });
            return;
        }
        if (!password) {
            res.status(400).json({
                success: false,
                message: 'Password is required',
            });
            return;
        }

        const normalizedEmail = email.trim().toLowerCase();
        const existingUser = await User.findOne({ email: normalizedEmail });

        if (existingUser) {
            res.status(409).json({
                success: false,
                message: 'Email already used',
            });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await new User({
            firstName,
            lastName,
            email: normalizedEmail,
            password: hashedPassword,
        });
        await newUser.save();

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
        });
        return;
    } catch (error) {
        res.status(500).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : 'Internal server error',
        });
    }
};

const addToCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, productId, quantity, size } = req.body;

        if (!userId || !productId) {
            res.status(400).json({
                success: false,
                message: 'userId and productId are required',
            });
            return;
        }

        if (
            !mongoose.Types.ObjectId.isValid(userId) ||
            !mongoose.Types.ObjectId.isValid(productId)
        ) {
            res.status(400).json({
                success: false,
                message: 'invalid userId or productId',
            });
            return;
        }

        const user = await User.findById(userId);
        const product = await Product.findById(productId);

        if (!user || !product) {
            res.status(404).json({
                success: false,
                message: 'User or Product not found',
            });
            return;
        }

        const cartItem = {
            productId: product._id,
            name: product.name,
            price: product.price,
            quantity: quantity || 1,
            size: size || null,
            image: product.image[0] || null,
        };

        user.cart.push(cartItem);
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Product added to cart',
            cart: user.cart,
        });
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export { loginUser, registerUser, addToCart };
