import express from "express";
import {protect, admin} from '../middleware/authMiddleware.js'
import {getProducts, getProductsById, createProduct, updateProduct} from '../controller/productController.js'
const router = express.Router();


router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id').get(getProductsById).put(protect,admin,updateProduct);

export default router;