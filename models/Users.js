const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      minlength: [3, "Le nom doit contenir au moins 3 caractères"],
      maxlength: [50, "Le nom doit contenir moins de 50 caractères"],
      required: true,
    },
    lastname: {
      type: String,
      minlength: [3, "Le nom de famille doit contenir au moins 3 caractères"],
      maxlength: [50, "Le nom de famille doit contenir moins de 50 caractères"],
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        //Voici la validation, nom utilisateur@domaine.com//
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Veuillez fournir une adresse email valide",
      ],
     
    },

    city: {
      type:String,
      required: true,
    },

    password: {
      type: String,
      minlength: [6," Le mot de passe doit contenir un mininmum de 6 caractères "],
      required: true,
      
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    cart: {
type: Array, 
default: false,

    }
  },

  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);
