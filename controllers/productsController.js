"use strict";

const products = require("../models/products");

// Utilise la méthode find() afin de récupérer tous les produits
exports.getProducts = (req, res, next) => {
  products
    .find()
    .then((products) => {
      res.status(200).json({
        products: products,
        
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
    });
};

// Récupère un produit avec l'id de ce dernier
exports.getProductsbyId = (req, res, next) => {
  const productsId = req.params.id;
  products.findById(productsId)
    .then((products) => {
      if (!products) {
        res.status(404).send();
      }
      res.status(200).json({
        product: products,
        pageTitle: "Produits",
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
    });
};

exports.createProducts = (req, res, next) => {
  const { title, description, price, image, categoryId,isSold } = req.body
const userId = req.user.userId
  const product = new products({
    title: title,
    description: description,
    price: price,
    image: image,
    userId: userId,
    categoryId: categoryId,
    isSold: isSold,
   
  });

  product
    .save()
    .then((result) => {
      result.isSold = true;
      return result.save();
      
    })
    .then((updatedProduct) => {
      res.status(201).json({
        message: "Produit ajouté avec succès au panier",
        product: updatedProduct,
      });
    })
    .catch((err) => {
      return res.status(422).json({
        errorMessage: err.errors,
      });
    });
};

exports.updateProduct = (req, res, next) => {
  const { title, desc, price, image } = req.body;
  const productId = req.params.productId;
  products.findById(productId)
    .then((product) => {
      product.title = title;
      product.desc = desc;
      product.price = price;
      product.image = image;
      return product.save();
    })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      next(err);
    });
};

exports.userNum = (req,res, next) => {
const userId = req.params.userId;
products.find({userId: userId})
    .then(products => {
      if (!products) {
        res.status(404).json({message: 'user id non trouvé'})
      } else {
        res.status(200).json({products});
      }
    })
    .catch(err => {
      res.status(500).json({message: 'Une erreur est survenue'})
    })
  };

exports.deleteProduct = (req, res, next) => {
  const productId = req.params.id;

  products.findByIdAndRemove(productId)
    .then((_) => {
      res.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};

