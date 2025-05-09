import express from 'express';
import {
    addProduct,
    deleteProduct,
    getAllProducts,
    getProduct,
    updateProduct,
} from '../controllers/productController';

const router = express.Router();

router.post('/add', addProduct);
router.get('/getProduct', getProduct);
router.get('/getAllProducts', getAllProducts);
router.delete('/delete', deleteProduct);
router.put('/update', updateProduct);

export default router;
