"use strict";

const express = require('express');
const app = express();
const mongoose = require('mongoose');



// Importe les routes
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');

// Importe le controller des erreurs
const errorController = require('./controllers/errorController');


// middleware pour le format JSON
app.use(express.json()); 


// Déclaration d'un parser pour analyser "le corps (body)" d'une requête entrante avec POST  
// Permet donc d'analyser
app.use(express.urlencoded({
  extended: false
}));


// Utilisation des routes en tant que middleware
// route /auth
app.use(authRoutes);
// route /
app.use(indexRoutes);

app.use(errorController.get404);

// gestion des erreurs 
app.use(errorController.logErrors);




mongoose.connect('mongodb+srv://dan:Bd123@cluster0.pyhhet3.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log('La connexion à la base de données est établie')
    app.listen(3000, () => {
      console.log('Le serveur écoute sur le port 3000');
    });
  })
  .catch(err => {
    console.log('La connexion à la base de données a échoué', err)
  })



