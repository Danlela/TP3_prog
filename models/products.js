"Use strtict"

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        title: {
            type: String, 
            maxlength: [250, "Le titre ne doit pas contenir plus de 250 caractères"],
            required: true,
        },

        description: {
            type: String,
            maxlenght: [250, "La description ne doit pas contenir plus de 250 caractères"],
            required: true,
        },

        price: {
            type: Number,
            required: true,

        },

        imageUrl: {
            type: Array, 
           maxlength: [250, "L'Url de l'image ne doit pas contenir plus de 250 caractères"],
           required: true, 
        },
       
        categoryId:{
            type: Schema.Types.ObjectId,
            ref: 'categories',
            required: true,
        },

        userId:{
            type: Schema.Types.ObjectId,
            ref: 'Users',
            required: true,
        },
        
        isSold: {
            type: Boolean,
            default: false,
          }
    },
    { timestamps: false }
);
  
module.exports = mongoose.model("Products", userSchema);