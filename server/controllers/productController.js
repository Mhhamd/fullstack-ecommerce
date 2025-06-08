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
exports.updateProduct = exports.deleteProduct = exports.getAllProducts = exports.getProduct = exports.addProduct = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productModel_1 = __importDefault(require("../model/productModel"));
const cloudinary_1 = __importDefault(require("cloudinary"));
require("../config/cloudinary");
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { name, description, price, category, subCategory, sizes, bestSeller, } = req.body;
        // Input Validation
        const requiredFields = {
            name,
            description,
            price,
            category,
            subCategory,
            sizes,
            bestSeller,
        };
        for (const [key, value] of Object.entries(requiredFields)) {
            if (!value || value.toString().trim() === '') {
                res.status(400).json({
                    success: false,
                    message: `Missing or empty required field ${key}`,
                });
                return;
            }
        }
        // Uploading Images
        const images = [];
        if (req.files && typeof req.files === 'object') {
            const fileFields = req.files;
            for (const field of ['image1', 'image2', 'image3', 'image4']) {
                if (((_a = fileFields[field]) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                    const file = fileFields[field][0];
                    const uploadedImage = yield cloudinary_1.default.v2.uploader.upload(file.path);
                    images.push(uploadedImage.secure_url);
                }
            }
        }
        const parsedSizes = Array.isArray(sizes) ? sizes : JSON.parse(sizes);
        // Adding the product
        const newProduct = new productModel_1.default({
            name,
            description,
            price,
            category,
            subCategory,
            bestSeller,
            sizes: parsedSizes,
            image: images,
            date: new Date(),
        });
        yield newProduct.save();
        res.status(201).json({
            success: true,
            message: 'Product added successfully',
            product: newProduct,
        });
    }
    catch (error) {
        if (error instanceof mongoose_1.default.Error.ValidationError) {
            const validationErrors = Object.values(error.errors).map((err) => err.message);
            res.status(400).json({
                success: false,
                message: validationErrors.join(', '),
            });
            return;
        }
        console.error('Error adding product:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.addProduct = addProduct;
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productModel_1.default.find({});
        res.status(200).json({ success: true, products });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});
exports.getAllProducts = getAllProducts;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({
                success: false,
                message: 'Product ID is required',
            });
            return;
        }
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                success: false,
                message: 'Invalid Product ID format',
            });
            return;
        }
        const product = yield productModel_1.default.findById(id);
        if (!product) {
            res.status(404).json({
                success: false,
                message: 'Product not found',
            });
            return;
        }
        res.status(200).json({ success: true, product });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});
exports.getProduct = getProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({
                success: false,
                message: 'Product ID is required',
            });
            return;
        }
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                success: false,
                message: 'Invalid Product ID format',
            });
            return;
        }
        const product = yield productModel_1.default.findByIdAndDelete(id);
        if (!product) {
            res.status(404).json({
                success: false,
                message: 'Product not found',
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: 'Product has been removed',
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});
exports.deleteProduct = deleteProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, description, price, hasDiscount, discount, image, category, subCategory, sizes, bestSeller, } = req.body;
        if (!id) {
            res.status(400).json({
                success: false,
                message: 'Product ID is required',
            });
            return;
        }
        const parsedSizes = Array.isArray(sizes) ? sizes : JSON.parse(sizes);
        const product = yield productModel_1.default.findByIdAndUpdate(id, {
            name,
            description,
            price,
            hasDiscount,
            discount,
            image,
            category,
            subCategory,
            sizes: parsedSizes,
            bestSeller,
        }, { new: true });
        if (!product) {
            res.status(404).json({
                success: false,
                message: 'Product not found',
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            product,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});
exports.updateProduct = updateProduct;
