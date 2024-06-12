const express = require('express');
const router = express.Router();
const exphbs = require('express-handlebars'); 

let productIdCounter = 1;
const products = [];

module.exports = (io) => {
  router.post('/', (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;
    const newProduct = {
      id: productIdCounter++,
      title,
      description,
      code,
      price,
      status: status !== undefined ? status : true,
      stock,
      category,
      thumbnails
    };
    products.push(newProduct);
    io.emit('productosActualizados', products); 
    res.status(201).json(newProduct);
  });

  router.get('/', (req, res) => {
    const { limit } = req.query;
    if (limit) {
      res.json(products.slice(0, limit));
    } else {
      res.json(products);
    }
  });

  router.get('/:pid', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.pid));
    if (product) {
      res.json(product);
    } else {
      res.status(404).send('Product not found');
    }
  });

  router.put('/:pid', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.pid));
    if (product) {
      const { title, description, code, price, status, stock, category, thumbnails } = req.body;
      product.title = title !== undefined ? title : product.title;
      product.description = description !== undefined ? description : product.description;
      product.code = code !== undefined ? code : product.code;
      product.price = price !== undefined ? price : product.price;
      product.status = status !== undefined ? status : product.status;
      product.stock = stock !== undefined ? stock : product.stock;
      product.category = category !== undefined ? category : product.category;
      product.thumbnails = thumbnails !== undefined ? thumbnails : product.thumbnails;
      res.json(product);
    } else {
      res.status(404).send('Product not found');
    }
  });

  router.delete('/:pid', (req, res) => {
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.pid));
    if (productIndex !== -1) {
      products.splice(productIndex, 1);
      io.emit('productosActualizados', products);
      res.status(204).send();
    } else {
      res.status(404).send('Product not found');
    }
  });

  return router;
};
