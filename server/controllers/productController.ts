import Product from '../model/productModel';
import { Request, Response } from 'express';

const addProduct = async (req: Request, res: Response) => {};

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
            id,
        } = req.body;
        if (!id) {
            res.status(400).json({
                success: false,
                message: 'Product ID is required',
            });
            return;
        }

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
                sizes,
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
