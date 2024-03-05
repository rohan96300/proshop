import express from "express";
import {protect, admin} from '../middleware/authMiddleware.js'
import {getProducts, getProductsById, createProduct, updateProduct, deleteProduct, createProductReview, getTopProducts} from '../controller/productController.js'
const router = express.Router();


router.route('/').get(getProducts).post(protect, admin, createProduct);
router.get('/top', getTopProducts);
router.route('/:id').get(getProductsById).put(protect,admin,updateProduct).delete(deleteProduct);
router.route('/:id/reviews').post(protect, createProductReview);


export default router;