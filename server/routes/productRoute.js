"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const multer_1 = __importDefault(require("../middleware/multer"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post('/add', auth_1.authUser, (0, auth_1.authorizeRoles)('admin'), multer_1.default.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
]), productController_1.addProduct);
router.get('/get-product/:id', productController_1.getProduct);
router.get('/get-all-products', productController_1.getAllProducts);
router.delete('/delete/:id', auth_1.authUser, (0, auth_1.authorizeRoles)('admin'), productController_1.deleteProduct);
router.put('/update/:id', auth_1.authUser, (0, auth_1.authorizeRoles)('admin'), multer_1.default.none(), productController_1.updateProduct);
exports.default = router;
