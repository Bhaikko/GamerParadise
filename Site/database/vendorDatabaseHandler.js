const { Products, ProductGenres, Genres } = require("./database");


const getGenreId = (genre) => {
    return Genres.findOne({
        where: {
            genre 
        }
    })
     .then(genre => {
         return genre.id;
     });
}

const addProduct = (name, price, productType, productSubtype, image, genres, vendorId) => {
    Products.create({
        name,
        price,
        productType,
        productSubtype,
        image,
        vendorId,
    })
     .then((product) => {
        if(typeof genres == "string")
        {
            getGenreId(genres)
             .then(id => {
                ProductGenres.create({
                    productId: product.get().id,
                    genreId: id
                });
             });
        }
        else 
        {
            Promise.all(genres.map((genre) => {
                getGenreId(genre)
                 .then(id => {
                    ProductGenres.create({
                    productId: product.get().id,
                    genreId: id 
                    })
                })
            }));
        }
     });
}

module.exports = {
    addProduct
}
