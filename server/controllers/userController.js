"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromCart = exports.addToCart = exports.registerUser = exports.loginUser = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const productModel_1 = __importDefault(require("../model/productModel"));
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const existingUser = yield userModel_1.default.findOne({ email: normalizedEmail });
        if (!existingUser) {
            res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
            return;
        }
        const passwordMatch = yield bcrypt_1.default.compare(password, existingUser.password);
        if (!passwordMatch) {
            res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
            return;
        }
        const tokenSecret = process.env.TOKEN_SECRET;
        if (!tokenSecret) {
            throw new Error('TOKEN_SECRET is not defined in environment variables');
        }
        const token = jsonwebtoken_1.default.sign({ _id: existingUser._id, role: existingUser.role }, tokenSecret, {
            expiresIn: '2h',
        });
        res.status(200)
            .header('Authorization', `Bearer ${token}`)
            .json({
            success: true,
            message: 'Login successful',
            token: token,
            user: {
                _id: existingUser._id,
                name: existingUser.firstName,
                email: existingUser.email,
                role: existingUser.role,
                cart: existingUser.cart,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : 'Internal server error',
        });
    }
});
exports.loginUser = loginUser;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const existingUser = yield userModel_1.default.findOne({ email: normalizedEmail });
        if (existingUser) {
            res.status(409).json({
                success: false,
                message: 'Email already used',
            });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield new userModel_1.default({
            firstName,
            lastName,
            email: normalizedEmail,
            password: hashedPassword,
        });
        yield newUser.save();
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
        });
        return;
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : 'Internal server error',
        });
    }
});
exports.registerUser = registerUser;
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, productId, quantity, size } = req.body;
        if (!userId || !productId) {
            res.status(400).json({
                success: false,
                message: 'userId and productId are required',
            });
            return;
        }
        if (!mongoose_1.default.Types.ObjectId.isValid(userId) ||
            !mongoose_1.default.Types.ObjectId.isValid(productId)) {
            res.status(400).json({
                success: false,
                message: 'invalid userId or productId',
            });
            return;
        }
        const user = yield userModel_1.default.findById(userId);
        const product = yield productModel_1.default.findById(productId);
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
        yield user.save();
        res.status(200).json({
            success: true,
            message: 'Product added to cart',
            updatedUser: user,
        });
    }
    catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});
exports.addToCart = addToCart;
const removeFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cartItemId, userId } = req.body;
        if (!userId || !cartItemId) {
            res.status(400).json({
                success: false,
                message: 'userId and productId are required',
            });
            return;
        }
        if (!mongoose_1.default.Types.ObjectId.isValid(userId) ||
            !mongoose_1.default.Types.ObjectId.isValid(cartItemId)) {
            res.status(400).json({
                success: false,
                message: 'invalid userId or productId',
            });
            return;
        }
        const user = yield userModel_1.default.findById(userId);
        if (!user) {
            res.status(404).json({
                success: false,
                message: 'User not found',
            });
            return;
        }
        user.cart = user.cart.filter((item) => item._id.toString() !== cartItemId);
        yield user.save();
        res.status(200).json({
            success: true,
            message: 'Product removed from cart',
            updatedUser: user,
        });
    }
    catch (error) {
        console.error('Error removing from cart:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});
exports.removeFromCart = removeFromCart;
