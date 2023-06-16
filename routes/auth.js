"use strict";

const express = require('express');

const authController = require('../controllers/authController');

const router = express.Router();

// /auth/login/ => POST Cette route nous login en nous donnant un token 
router.post('/login', authController.login);

// /auth/signup/ => POST Pour nous créer un compte sur le site 
router.post('/signup', authController.signup);

module.exports = router;
