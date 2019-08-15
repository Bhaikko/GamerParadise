const { Users, Products, Vendors } = require("./database");  
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
            [Op.iLike]: "%" + name + "%"
        }
    })
     .then(products => productParser(products));
}

module.exports = {
    addUser,
    getProductsHomepage,
    getProductsSearch
}
