"use strict";
const Users = require("../models/Users");
const product = require("../models/products");

exports.getCart = (req, res, next) => {
  const userId = req.user.userId;
  Users.findById(userId)
    .then((users) => {
      if (!users) {
        res.status(404).send();
      }
      res.status(200).json({
        cart: users.cart,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
    });
};

exports.updateProductIsSold = (req, res, next) => {
  const productId = req.body.id;
  const user = req.user.userId;
  Users.findById(user)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "Utilisateur introuvable" });
      }

      product
        .findById(productId)
        .then((product) => {
          if (!product) {
            return res.status(404).json({ message: "Produit introuvable" });
          }

          product.isSold = true;

          user.cart.push(product);

          return user.save();
        })
        .then(() => {
          res
            .status(200)
            .json({ message: "Produit ajouté au panier avec succès" });
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteCartItem = (req, res, next) => {
  const productId = req.params.id;
  const userId = req.user.userId;

  Users.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }

      const index = user.cart.indexOf(productId) 

      user.cart.splice(index, 1);

      return user.save();
    })
    .then(() => {
       res.json({ message: "Produit supprimé du panier" });
    })
    .catch((error) => {
      console.error(
        "Erreur lors de la suppression du produit du panier :",
        error
      );
     return res
        .status(500)
        .json();
   });
};
