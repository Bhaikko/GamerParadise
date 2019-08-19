const { Vendors, Products, ProductGenres, Genres, Orders, Users } = require("./database");

const productParser = (products) => {
    let productsData = [];
    products.map(product => productsData.push(product.get()))
    return productsData;
}

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

const getOrders = (vendorId) => {
    return Orders.findAll({
        where: {
            vendorId
        },
        attributes: ["id", "quantity", "method", "time", "status"],
        include: [
            {
                model: Users,
                attributes: ["name", "address", "mobile"]
            },
            {
                model: Products,
                attributes: ["name", "price", "image"]
            }
        ]
    })
     .then(orders => productParser(orders));
}

const dispatchOrder = (orderId) => {
    return Orders.update({
        status: "Dispatched"
    },
    {
        where: {
            id: orderId
        }           
    });
}

const declineOrder = (orderId) => {
    return Orders.update({
        status: "Declined"
    },
    {
        where: {
            id: orderId
        }           
    });
}

module.exports = {
    addVendor,
    addProduct,
    getProducts,
    deleteProduct,
    getOrders,
    dispatchOrder,
    declineOrder
}
