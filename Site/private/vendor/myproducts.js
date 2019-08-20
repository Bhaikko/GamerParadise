let games = [];
let consoles = [];
let accessories = [];
let components = [];

const gamesBox = $("#games");
const componentsBox = $("#components");
const accessoriesBox = $("#accessories");
const consolesBox = $("#consoles");

let deleteProductButtons = $(".deleteProductButton");

$.get("/vendor/getUsername", user => {
    $("#username").text("Hi " + user.companyName);
});

const render = (box, products) => {
    box.empty();
    products.map((product) => {
        box.append(
            `
            <div class="product bg-light text-dark p-3 mb-2">
                <div class="productName">Name: <b>${product.name}</b></div>
                <div class="productPrice">Price: <b>${product.price}</b></div>
                <div class="productSubtype">SubType: <b>${product.productSubtype}</b></div>
                <button type="button" class="btn btn-danger deleteProductButton"  style="margin-bottom: 10px;" value="${product.id}">Delete Product</button>
            </div>
            `
        );
    });
    deleteProductButtons = $(".deleteProductButton");
    
}

$.get("/vendor/products", (products) => {
    products.map((product) => {
        if(product.productType == "games")
            games.push(product);
        else if(product.productType == "console")
            consoles.push(product);
        else if(product.productType == "components")
            components.push(product)
        else 
            accessories.push(product);
    })

    render(gamesBox, games);
    render(componentsBox, components);
    render(consolesBox, consoles);
    render(accessoriesBox, accessories);


    deleteProductButtons.each((index) => {
        deleteProductButtons[index].addEventListener("click", (event) => {
            $.ajax({
                url: '/vendor/deleteProduct',
                type: 'DELETE',
                data: {
                    id: event.target.value
                },
                success: function() {
                    event.target.parentNode.remove();
                }
            });
        })
    })
    
});

let gamesSearch = $("#gamesSearch");
gamesSearch[0].addEventListener("input", () => {
    const filtered = games.filter(game => {
        if(game.name.toLowerCase().includes(gamesSearch[0].value.toLowerCase()))
            return game;
    });
    render(gamesBox, filtered); 
});

let consolesSearch = $("#consolesSearch");
consolesSearch[0].addEventListener("input", () => {
    const filtered = consoles.filter(consol => {
        if(consol.name.toLowerCase().includes(consolesSearch[0].value.toLowerCase()))
            return consol;
    });
    render(consolesBox, filtered); 
});


let accessoriesSearch = $("#accessoriesSearch");
accessoriesSearch[0].addEventListener("input", () => {
    const filtered = accessories.filter(accessory => {
        if(accessory.name.toLowerCase().includes(accessoriesSearch[0].value.toLowerCase()))
            return accessory;
    });
    render(accessoriesBox, filtered); 
});

let componentSearch = $("#componentSearch");
componentSearch[0].addEventListener("input", () => {
    const filtered = components.filter(component => {
        
        if(component.name.toLowerCase().includes(componentSearch[0].value.toLowerCase()))
            return component;
    });
    render(componentsBox, filtered); 
});





