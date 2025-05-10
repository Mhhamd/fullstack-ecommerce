import express from 'express';
import {
    addProduct,
    deleteProduct,
    getAllProducts,
    getProduct,
    updateProduct,
} from '../controllers/productController';
import upload from '../middleware/multer';

const router = express.Router();

router.post(
    '/add',
    upload.fields([
        { name: 'image1', maxCount: 1 },
        { name: 'image2', maxCount: 1 },
        { name: 'image3', maxCount: 1 },
        { name: 'image4', maxCount: 1 },
    ]),
    addProduct
);
router.get('/getProduct', getProduct);
router.get('/getAllProducts', getAllProducts);
router.delete('/delete', deleteProduct);
router.put('/update', updateProduct);

export default router;
