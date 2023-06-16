"use strict";

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const User = require('../models/Users');

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log('loadedUser', email, password);

  let loadedUser;
  User.findOne({email: email})
  .then(user =>{
    // Les méthodes findOne, findById ... peuvent retourner null
    // Il faut gérer le cas où user est null
    if (!user) {
      const error = new Error('Utilisateur non trouvée');
      error.statusCode = 404;
      throw error;
    }
    loadedUser = user;
    console.log('loadedUser', loadedUser);
    return bcrypt.compare(password, user.password);
  })
  .then(isEqual => {
    if (!isEqual) {
      const error = new Error('Mauvais mot de passe !');
      error.statusCode = 401;
      throw error;
    }
    
    // Création du token JWT
    const token = jwt.sign(
      {
        email: loadedUser.email,
        name: loadedUser.name,
        userId: loadedUser._id.toString(),
        isAdmin: loadedUser.isAdmin

      },
      // Utilise la clé secrète qui est dans le fichier .env
      process.env.SECRET_JWT,
      { expiresIn: '1h' }
    );
    res.status(200).json({ token: token });
  })
  .catch(err =>{
    next(err);
  })
};

// Enregistre un utilisateur dans la bd
exports.signup = (req, res, next) => {
  const email = req.body.email;
  const city = req.body.city;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const password = req.body.password;

  const user = new User({
    firstname: firstname,
    lastname: lastname,
    city: city,
    email: email,
    password: password,
  });
  //Sauvegarde des infos de l'utilisateur créé//
  user.save()
  .then(result => {
    res.status(201).json({
      message: "Bienvenue parmi nous ! ",
      user: result
    })
  })
  .catch(err => {
    return res.status(422).json({
      errorMessage: err.errors
    })
  })




  // Utilisation de bcrypt pour hacher le mot de passe
  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const user = new User({
        firstname: firstname,
      lastname: lastname,
      city: city,
        email: email,
        password: hashedPassword
      });
      return user.save();
    })
    .then(result => {
      res.status(201).json({message: "Utilisateur créé !", userId: result.id});
    })
    .catch(err => {
      next(err);
    });

  };

