const Sequelize = require("sequelize");

const database = new Sequelize("gamerparadise", "gamerparadiseAdmin", "123456", {
    host: "localhost",
    dialect: "mysql",
    logging: false,
    
});

const Users = database.define("users", {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    address: {
        type: Sequelize.STRING,
        allowNull:false
    },
    email: {
        unique: true,
        type: Sequelize.STRING,
        allowNull:false
    },
    mobile: {
        type: Sequelize.STRING,
        allowNull:false 
    },
    password: {
        type: Sequelize.STRING,
        allowNull:false 
    }

});

const CartItems = database.define("cartItems", {
    quantity: {
        type: Sequelize.STRING,
        defaultValue: 0
    }
    
});


const Orders = database.define("orders", {
    time: {
        type: Sequelize.STRING,
        allowNull: false 
    },
    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
    },
    status: {
        type: Sequelize.STRING,
        defaultValue: "Confirmation Pending"
    }
});

const Platforms = database.define("platforms", {
    name: {
        type: Sequelize.STRING 
    }
});

const Products = database.define("products", {
    name: {
        type: Sequelize.STRING,
        allowNull: false 
    },
    productType: {
        type: Sequelize.STRING,
    },
    productSubtype:{
        type: Sequelize.STRING,
    },
    genre: {
        type: Sequelize.STRING,
    },
    platform: {
        type: Sequelize.STRING 
    }

});

const Genres = database.define("genres", {
    genre: {
        type: Sequelize.STRING 
    }
});


const Reviews = database.define("reviews", {
    review: {
        type: Sequelize.TEXT,
        allowNull: false 
    },
    stars: {
        type: Sequelize.INTEGER,
        allowNull: false 
    }
});


const Vendors = database.define("vendors", {
    companyName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    companyAddress: {
        type: Sequelize.STRING,
        allowNull: false 
    },
    companyPhone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    companyMobile: {
        type: Sequelize.STRING,
        allowNull: false
    },
    companyEmail: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true 
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false 
    }
});

CartItems.belongsTo(Users);
CartItems.belongsTo(Products);

Orders.belongsTo(Users);
Orders.belongsTo(Products);
Orders.belongsTo(Vendors);

Products.belongsToMany(Platforms, { through: "ProductPlatform"});
Platforms.belongsToMany(Products, { through: "ProductPlatform"});
Products.belongsToMany(Genres, { through: "ProductGenres"});
Genres.belongsToMany(Products, { through: "ProductGenres"});

Reviews.belongsTo(Products);

module.exports = {
    database
}