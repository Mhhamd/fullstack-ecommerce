import express from 'express';
import {
    addProduct,
    deleteProduct,
    getAllProducts,
    getProduct,
    updateProduct,
} from '../controllers/productController';
import upload from '../middleware/multer';
import { authorizeRoles, authUser } from '../middleware/auth';

const router = express.Router();

router.post(
    '/add',
    authUser,
    authorizeRoles('admin'),
    upload.fields([
        { name: 'image1', maxCount: 1 },
        { name: 'image2', maxCount: 1 },
        { name: 'image3', maxCount: 1 },
        { name: 'image4', maxCount: 1 },
    ]),
    addProduct
);
router.get('/get-product/:id', getProduct);
router.get('/get-all-products', getAllProducts);
router.delete('/delete/:id', authUser, authorizeRoles('admin'), deleteProduct);
router.put(
    '/update/:id',
    authUser,
    authorizeRoles('admin'),
    upload.none(),
    updateProduct
);

export default router;
