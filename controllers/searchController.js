const Product =require('../models/products');

exports.searchProduct =(req, res, next) => {
    const Query = req.query.q;
    Product.find({title:{$regex:Query,$options:"i"}})
    .populate('userId')
    .then(products =>{
        res.status(200).json({ products });

    })
 
   // .catch(err => {

     // console.error(err);

     // res.status(500).json({ error: 'Une erreur s\'est produite.' });

    //});

};
        