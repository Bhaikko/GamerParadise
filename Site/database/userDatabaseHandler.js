const { Users, Products, Genres, Vendors, Reviews, CartItems, Orders } = require("./database");  
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

const getProductDetails = (productId) => {
    return Products.findOne({
        include: [
                    {model: Genres, attributes: ["genre"]}, 
                    {
                        model: Reviews, 
                        attributes: ["userId", "stars", "review"],
                        include: {model: Users, attributes: ["name"]}   
                    },
                    {model: Vendors, attributes: ["companyName"]}
                ],
        attributes: ["image", "name", "price"],
        where: {
            id: productId
        }
    })
     .then(product => product);
}

const addReview = (review, stars, productId, userId) => {
    Reviews.create({
        review,
        stars,
        productId,
        userId
    });
}

const addCartItem = (userId, productId) => {
    return CartItems.findOne({
        where: {
            userId: userId,
            productId: productId
        }
    
    })
    .then(cartitem => {
        
        if(cartitem)
        {
            return CartItems.update({
                quantity: parseInt(cartitem.quantity) + 1
            },
            {
                where: {
                    userId,
                    productId
                }           
            })
             .then(() => "exist");
        }
        else
        {
            return CartItems.create({
                userId,
                productId,
                quantity: 1
            })
             .then(() => "created");
        }
    });
}

const getCartItems = (userId) => {
    return CartItems.findAll({
        include: [{model: Products, attributes: ["name", "price", "id"]}],
        attributes: ["quantity"],
        where: {
            userId 
        }
    })
     .then(cartItems => productParser(cartItems));
}

const deleteCartItem = (productId, userId) => {
    CartItems.destroy({
        where: {
            productId,
            userId
        }
    });
}

const updateQuantity = (productId, userId, quantity) => {
    CartItems.update({
        quantity
    },
    {
        where: {
            userId,
            productId
        }           
    })
}

const getOrderDetails = (userId) => {
    return CartItems.findAll({
        include: [
            {
                model: Products, 
                attributes: ["name", "price"],
                include: {
                    model: Vendors,
                    attributes: ["companyName", "id"]
                }
            },
            {
                model: Users,
                attributes: ["name"]
            }
        ],
        attributes: ["id", "quantity", "userId", "productId"],
        where: {
            userId
        }
    })
     .then(products => productParser(products));
}

const addToOrder = (time, quantity, method, userId, productId, vendorId) => {
    return Orders.create({
        time,
        quantity,
        method,
        userId,
        productId,
        vendorId
    });
}

const emptyCartList = (userId) => {
    return CartItems.destroy({
        where: {
            userId
        }
    })
}

const getOrders = (userId) => {
    return Orders.findAll({
        where: {
            userId 
        },
        attributes: ["quantity", "time", "method", "status"],
        include: [
            {
                model: Vendors,
                attributes: ["companyName", "companyEmail", "companyMobile"]
            },
            {
                model: Products,
                attributes: ["id", "name", "price", "image"]
            },
            {
                model: Users,
                attributes: ["name"]
            }
        ]
    })
    .then(orders => productParser(orders));
}

const getUsername = (userId) => {
    return Users.findOne({
        where: {
            id: userId 
        },
        attributes: ["name"]

    })
     .then(user => user);
}

module.exports = {
    addUser,
    getProductsHomepage,
    getProductsSearch,
    getProductsFiltered,
    getProductDetails,
    addReview,
    addCartItem,
    getCartItems,
    deleteCartItem,
    updateQuantity,
    getOrderDetails,
    addToOrder,
    emptyCartList,
    getOrders,
    getUsername
}
