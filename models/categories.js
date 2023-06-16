"Use strict"

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    { name: {
        type: String,
        maxlenght: [50, "Le nom de l'article ne doit pas contenir plus de 50 caractères"],
        required: true,
    }
         
    },
    { timestamps: true }
);

module.exports = mongoose.model("Categories", userSchema);