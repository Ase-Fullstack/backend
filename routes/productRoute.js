const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/authMiddleware');
const {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  reviewProduct,
  deleteReview,
  updateReview
} = require('../controllers/productController');
const { upload } = require('../utils/fileUpload');

router.post('/', protect, adminOnly, createProduct);
router.get('/', getProducts);
router.get('/:id', getProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);
router.patch('/:id', protect, updateProduct);

router.patch('/review/:id', protect, reviewProduct);
router.delete('/deleteReview/:id', protect, deleteReview);
router.patch('/updateRview/:id', protect, updateReview);

module.exports = router;
