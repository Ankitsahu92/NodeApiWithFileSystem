const Product = require('../models/product');
const Cart = require('../models/cart');
const generic = require('../util/output.service');

exports.getProducts = (req, res, next) => {
  console.log("*********getProducts************");
  Product.fetchAll(products => {
    res.json(generic.jsonRes(200, "", product));
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    res.json(generic.jsonRes(200, "", product));
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.json(generic.jsonRes(200, "", product));
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          prod => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.json(generic.jsonRes(200, "", cartProducts));

    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.addProduct(prodId, product.price);
  });
  res.json(generic.jsonRes(200, "", cartProducts));
};

// exports.postCartDeleteProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   Product.findById(prodId, product => {
//     Cart.deleteProduct(prodId, product.price);
//     res.redirect('/cart');
//   });
// };

// exports.getOrders = (req, res, next) => {
//   res.json(generic.jsonRes(200, "", cartProducts));
//   // res.render('shop/orders', {
//   //   path: '/orders',
//   //   pageTitle: 'Your Orders'
//   // });
// };

// exports.getCheckout = (req, res, next) => {
//   res.render('shop/checkout', {
//     path: '/checkout',
//     pageTitle: 'Checkout'
//   });
// };
