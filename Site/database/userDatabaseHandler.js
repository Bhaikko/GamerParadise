const { Users, Products, Vendors, Genres, ProductGenres } = require("./database");  
const Op = require("sequelize").Op;

const addUser = (name, address, email, mobile, password) => {
    Users.create({
        name,
        address,
        email,
        mobile,
        password
    });
}

const productParser = (products) => {
    let productsData = [];
    products.map(product => productsData.push(product.get()))
    return productsData;
}

const getProductsHomepage = (productType) => {
    return Products.findAll({
        where: {
            productType 
        }
        
    })
     .then(products => productParser(products));
}

const getProductsSearch = (name) => {
    
    return Products.findAll({
        where: {
            name: {
                [Op.like]: "%" + name + "%"
            }
        }
    })
     .then(products => productParser(products));
}

const getProductsFiltered = (productType, productSubtype, genre, maxPrice, minPrice) => {
    if(genre.length != 0)
    {
        if(typeof genre == "string")
            genre = [genre];

        console.log(genre);
        return Products.findAll({
            include: [Genres],
            where: {
                [Op.and]: {
                    productType,
                    productSubtype: {
                        [Op.like]: "%" + productSubtype + "%"
                    },
                    price: {
                        [Op.between]: [minPrice, maxPrice]
                    },
                    '$genres.genre$': {
                        [Op.in]: genre
                    }
                }
            }
        })
         .then(products => productParser(products));
    }
    else 
    {
        
        return Products.findAll({
            where: {
                [Op.and]: {
                    productType,
                    productSubtype: {
                        [Op.like]: "%" + productSubtype + "%"
                    },
                    price: {
                        [Op.between]: [minPrice, maxPrice]
                    }
                }
            }
        })
         .then(products => productParser(products));
    }
}

module.exports = {
    addUser,
    getProductsHomepage,
    getProductsSearch,
    getProductsFiltered
}
