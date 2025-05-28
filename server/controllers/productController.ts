import mongoose from 'mongoose';
import Product from '../model/productModel';
import cloudinary from 'cloudinary';
import { Request, Response } from 'express';
import '../config/cloudinary';

const addProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            name,
            description,
            price,
            category,
            subCategory,
            sizes,
            bestSeller,
        } = req.body;

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
        const images: string[] = [];
        if (req.files && typeof req.files === 'object') {
            const fileFields = req.files as {
                [fileName: string]: Express.Multer.File[];
            };
            for (const field of ['image1', 'image2', 'image3', 'image4']) {
                if (fileFields[field]?.length > 0) {
                    const file = fileFields[field][0];
                    const uploadedImage = await cloudinary.v2.uploader.upload(
                        file.path
                    );
                    images.push(uploadedImage.secure_url);
                }
            }
        }

        const parsedSizes = Array.isArray(sizes) ? sizes : JSON.parse(sizes);

        // Adding the product
        const newProduct = new Product({
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

        await newProduct.save();
        res.status(201).json({
            success: true,
            message: 'Product added successfully',
            product: newProduct,
        });
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            const validationErrors = Object.values(error.errors).map(
                (err) => err.message
            );
            res.status(400).json({
                success: false,
                message: validationErrors.join(', '),
            });
            return;
        }
        console.error('Error adding product:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

const getProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({
                success: false,
                message: 'Product ID is required',
            });
            return;
        }

        if (!mongoose.Types.ObjectId.isValid(id as string)) {
            res.status(400).json({
                success: false,
                message: 'Invalid Product ID format',
            });
            return;
        }

        const product = await Product.findById(id);
        if (!product) {
            res.status(404).json({
                success: false,
                message: 'Product not found',
            });
            return;
        }

        res.status(200).json({ success: true, product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({
                success: false,
                message: 'Product ID is required',
            });
            return;
        }

        if (!mongoose.Types.ObjectId.isValid(id as string)) {
            res.status(400).json({
                success: false,
                message: 'Invalid Product ID format',
            });
            return;
        }

        const product = await Product.findByIdAndDelete(id);
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
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

const updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const {
            name,
            description,
            price,
            hasDiscount,
            discount,
            image,
            category,
            subCategory,
            sizes,
            bestSeller,
        } = req.body;
        if (!id) {
            res.status(400).json({
                success: false,
                message: 'Product ID is required',
            });
            return;
        }
        const parsedSizes = Array.isArray(sizes) ? sizes : JSON.parse(sizes);

        const product = await Product.findByIdAndUpdate(
            id,
            {
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
            },
            { new: true }
        );
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
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export { addProduct, getProduct, getAllProducts, deleteProduct, updateProduct };
