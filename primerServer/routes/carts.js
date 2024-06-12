const express = require('express');
const router = express.Router();

let cartIdCounter = 1;
const carts = [];

router.post('/', (req, res) => {
  const newCart = {
    id: cartIdCounter++,
    products: []
  };
  carts.push(newCart);
  res.status(201).json(newCart);
});

router.get('/:cid', (req, res) => {
  const cart = carts.find(c => c.id === parseInt(req.params.cid));
  if (cart) {
    res.json(cart.products);
  } else {
    res.status(404).send('Cart not found');
  }
});

router.post('/:cid/product/:pid', (req, res) => {
  const cart = carts.find(c => c.id === parseInt(req.params.cid));
  const product = products.find(p => p.id === parseInt(req.params.pid));
  if (cart && product) {
    const cartProduct = cart.products.find(p => p.id === product.id);
    if (cartProduct) {
      cartProduct.quantity += 1;
    } else {
      cart.products.push({ ...product, quantity: 1 });
    }
    res.status(201).json(cart);
  } else {
    res.status(404).send('Cart or Product not found');
  }
});

module.exports = router;
