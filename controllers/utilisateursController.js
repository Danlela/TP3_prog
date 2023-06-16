"use strict";

const User = require("../models/Users");

//retourne la liste des utilisateurs//
exports.getUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      res.status(200).json({
        users: users,
        pageTitle: "Utilisateurs",
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
    });
};
//Récupère un utilisateur grâce à son Id//
exports.getUserid = (req, res, next) => {
  const UserId = req.params.id;
  User.findById(UserId)
    .then((User) => {
      if (!User) {
        res.status(404).send();
      }
      res.status(200).json({
        User: User,
        pageTitle: "Utilisateur Id",
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
    });
};

exports.getUserProfil = (req, res, next) => {
  const userId = req.user.userId;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "Utilisateur non trouvé" });
      } else {
        res.status(200).json({ user });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Une erreur est survenue" });
    });
};

// Modification des infos de l'utilisateur//
exports.updateUser = (req, res, next) => {
  const { firstname, lastname, isAdmin, cart } = req.body;
  const userId = req.params.id;
  console.log(firstname, lastname, isAdmin, cart);
  User.findById(userId)
    .then((User) => {
      (User.name = firstname), lastname;

      return User.save();
    })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      next(err);
    });
};

// Ceci est pour supprimer un compte utilisateur//
exports.deleteUser = (req, res, next) => {
  const userId = req.params.id;

  User.findByIdAndRemove(userId)
    .then((_) => {
      res.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};
