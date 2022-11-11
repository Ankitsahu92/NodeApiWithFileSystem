const Product = require('../models/product');
const generic = require('../util/output.service');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);
  product.save();
  res.json(generic.jsonRes(200, "Record saved successfully!!!", product));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    res.json(generic.jsonRes(404, "edit parm required!!!"));
  }
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    if (!product) {
      res.json(generic.jsonRes(404, "record not found!!!"));
    }
    res.json(generic.jsonRes(200, "", product));
  });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  const updatedProduct = new Product(
    prodId,
    updatedTitle,
    updatedImageUrl,
    updatedDesc,
    updatedPrice
  );
  updatedProduct.save();
  res.json(generic.jsonRes(200, "Record update successfully!!!", updatedProduct));
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.json(generic.jsonRes(200, "", products));
  });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId);
  res.json(generic.jsonRes(200, "Record deleted successfully!!!", null));
};
