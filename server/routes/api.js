var express = require('express'), router = express.Router();
const productController = require('../controllers/products');

module.exports = (req, resp ) => {
    //This API is to get all tasks
    router.get('/v1/product/all', productController.getAllProduct);
    //This API is to get active tasks
    router.get('/v1/product/active', productController.getActiveProduct);
    //This API is to add task
    router.post('/v1/product/active', productController.addProduct);
    //This API is to update task
    router.post('/v1/product/active/update', productController.updateProduct);
    //This API is to delete task
    router.post('/v1/product/active/delete', productController.deleteProduct);
    return router;
};
