let games = [];
let consoles = [];
let accessories = [];
let components = [];

const gamesBox = $("#games");
const componentsBox = $("#components");
const accessoriesBox = $("#accessories");
const consolesBox = $("#consoles");

let deleteProductButtons = $(".deleteProductButton");

const render = (box, products) => {
    box.empty();
    products.map((product) => {
        box.append(
            `
            <div class="product bg-light text-dark p-3 mb-2">
                <div class="productid" hidden>${product.id}</div>
                <div class="productName">Name: <b>${product.name}</b></div>
                <div class="productPrice">Price: <b>${product.price}</b></div>
                <div class="productSubtype">SubType: <b>${product.productSubtype}</b></div>
                <button type="button" class="btn btn-danger deleteProductButton"  style="margin-bottom: 10px;">Delete Product</button>
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
                    id: event.target.parentNode.children[0].innerText
                },
                success: function() {
                    event.target.parentNode.remove();
                }
            });
        })
    })
    
});


