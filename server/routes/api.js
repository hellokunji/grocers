var express = require('express'), router = express.Router();
const productController = require('../controllers/products');

module.exports = (req, resp) => {
  router.get('/v1/product/all', productController.getAllProduct);
  router.get('/v1/product/active', productController.getActiveProduct);
  router.post('/v1/product/active', productController.addProduct);
  router.post('/v1/product/active/update', productController.updateProduct);
  router.post('/v1/product/active/delete', productController.deleteProduct);
  return router;
};
