const { Vendors, Products, ProductGenres, Genres } = require("./database");

const addVendor = (companyName, companyAddress, companyMobile, companyEmail, password) => {
    Vendors.create({
        companyName, 
        companyAddress,
        companyMobile,
        companyEmail,
        password
    });
}

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

const getProducts = (vendorId) => {
    return Products.findAll({
        attributes: ["id", "image", "name", "price", "productSubtype", "productType"],
        where: {
            vendorId
        }
    })
     .then(products => products);
}

const deleteProduct = (vendorId, productId) => {
    return Products.destroy({
        where: {
            id: productId,
            vendorId
        }
    })
}

module.exports = {
    addVendor,
    addProduct,
    getProducts,
    deleteProduct
}
