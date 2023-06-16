"use strict";

const Categories = require("../models/categories");

// Retourne la liste des catégories//
exports.getCategories = (req, res, next) => {
  Categories.find()
    .then((categories) => {
      console.log(categories);
      res.status(200).json({
        categories: categories,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
    });
};
// Retourne la liste des catégories de par l'Id //
exports.getCategoriesbyId = (req, res, next) => {
  const categoriesId = req.params.id;
  Categories.findById(categoriesId)
    .then((categories) => {
      if (!categories) {
        res.status(404).send();
      }
      res.status(200).json({
        categories: categories,
        pageTitle: "Catégories",
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
    });
};
//Ceci est pour créer une nouvelle catégorie//
exports.createCategories = (req, res, next) => {
  const { name } = req.body;

  if (!req.user.isAdmin) {
    return res.status(403).json({ error: "Accès refusé. Vous n'êtes pas autorisé à effectuer cette action." });
  }


  const categories = new Categories({
    name: name,
  });
  //Sauvegarde de la catégorie créé//
  categories
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Votre catégorie a été créé et acceptée, félicitation!!!!",
        categories: result,
      });
    })
    .catch((err) => {
      return res.status(422).json({
        errorMessage: err.errors,
      });
    });
};
// Permet de modifier la catégorie existante//
exports.updateCategories = (req, res, next) => {
  const { name } = req.body;
  const categoriesId = req.params.id;
  if (req.user.isAdmin) {
  Categories.findById(categoriesId)
    .then((categories) => {
      categories.name = name;

      return categories.save();
    })
    .then((result) => {
      res.status(200).json(result);
    })

    .catch((err) => {
      next(err);
    });
  } else {
    res.status(403).json({ error: "Accès refusé. Vous n'êtes pas autorisé à effectuer cette action." });
  }
  }

// Permet de supprimer une catégories//
exports.deleteCategories = (req, res, next) => {
  const categoriesId = req.params.id;

  if (req.user.isAdmin) {
    Categories.findByIdAndRemove(categoriesId)
      .then((_) => {
        res.status(204).send();
      })
      .catch((err) => {
        next(err);
      });
  } else {
    res.status(403).json({ error: "Accès refusé. Vous n'êtes pas autorisé à effectuer cette action." });
  }
};