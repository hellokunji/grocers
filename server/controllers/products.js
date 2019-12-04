var models = require('../models');

const productController = {
  getAllProduct: (req, res) => {
    models.Products.findAll({}).then(function (tasks) {
      res.json(tasks);
      console.log('tasks');
    })
      .catch(err => {
        res.send('error: ' + err)
      })
  },

  getActiveProduct: (req, res) => {
    models.CurrentProducts.findAll({}).then(function (tasks) {
      res.json(tasks);
    })
      .catch(err => {
        res.send('error: ' + err)
      })
  },

  addProduct: (req, res) => {
    console.log('addProduct', req);
    if (!req.body.id) {
      res.status(400);
      res.json({error: 'Bad Data for POST'})
    } else {
      models.CurrentProducts.create({
        quantity: req.body.quantity,
        product_id: req.body.id,
      }).then(function (product) {
        res.json(product);
      }).catch(err => {
        res.send('Error: ' + err)
      })
    }
  },

  updateProduct: (req, res) => {
    console.log('req',req.body);
    if (!req.body.quantity && !req.body.id) {
      res.status(400);
      res.json({error: 'Bad Data...'})
    } else {
      models.CurrentProducts.update(
        {
          quantity: req.body.quantity,
        },
        {
          where: {
            product_id: req.body.id
          }
        }
      ).then(function () {
        res.json({id: req.body.id, quantity: req.body.quantity});
      }).catch(err => {
        res.send('Error: ' + err)
      })
    }
  },

  deleteProduct: (req, res) => {
    console.log('req',req.body);
    if (!req.body.quantity && !req.body.id) {
      res.status(400);
      res.json({error: 'Bad Data...'})
    } else {
      models.CurrentProducts.destroy({
        where: {
          product_id: req.body.id
        }
      }).then(function () {
        res.json({id: req.body.id});
      }).catch(err => {
        res.send('Error: ' + err)
      })
    }
  }

};
module.exports = productController;
