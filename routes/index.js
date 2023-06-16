"use strict";

const express = require('express');
const router = express.Router();
// isAuth est un middleware qui vérifie si l'utilisateur est authentifié
const isAuth = require('../middleware/is-auth');
const categoriesController = require('../controllers/categoriesController');
const utilisateursController = require('../controllers/utilisateursController');
const productsController = require('../controllers/productsController');
const cartController = require('../controllers/cartController');
const searchController =  require('../controllers/searchController');



// /user => GET
router.get('/users/',utilisateursController.getUsers);

router.get('/users/profil', isAuth, utilisateursController.getUserProfil);

// /user/:id => GET
router.get('/users/:id',utilisateursController.getUserid);

// /user/:id => PUT
router.put('/users/:id', utilisateursController.updateUser);

// /user/:id => DELETE
router.delete('/users/:id', utilisateursController.deleteUser);

// /categories => GET
router.get('/categories',categoriesController.getCategories);

// /categories/:id => GET
router.get('/categories/:id',categoriesController.getCategoriesbyId);

// /categories => POST//
router.post('/categories/', isAuth, categoriesController.createCategories);

// /categories => PUT//
router.put('/categories/:id', isAuth, categoriesController.updateCategories);

// /categories:id => DELETE//
router.delete('/categories/:id', isAuth, categoriesController.deleteCategories);

// /products => GET//
router.get('/products', productsController.getProducts);

// /products/user/userId => Get
router.get('/products/user/:userId',productsController.userNum);

// /products/:id => GET//
router.get('/products/:id', productsController.getProductsbyId);

// /products => POST/ Crée un produit/
router.post('/products',isAuth,productsController.createProducts);

// /products => DELETE /delete un produit de par son id/
router.delete('/products/:id',isAuth,productsController.deleteProduct);

// /cart => GET / retourne le panier de l'utilisateur qui est connecté 
router.get('/cart',isAuth,cartController.getCart);

// /cart => PUT / mettre un produit au panier de l'utilisateur connecté le champ isSold du produit doit passer à true 
router.put('/cart',isAuth,cartController.updateProductIsSold);

// /cart => DELETE / Supprime le produit de l'utilisateur grâce à l'id du produit
router.delete('/cart/:id',isAuth,cartController.deleteCartItem);

// /search => GET / Est utilisé pour faire des recherche de produit dans la base de donnée 
router.get('/search',searchController.searchProduct);









// Export des routes pour utilisation dans app.js
module.exports = router;



