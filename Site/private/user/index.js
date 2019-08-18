let genres = $("#genres");
let components = $("#components");
let accessories = $("#accessories");
let companies = $("#companies");

let gamesButton = $("#gamesButton");
let componentsButton = $("#componentsButton");
let accessoriesButton = $("#accessoriesButton");
let consolesButton = $("#consolesButton");

let filters = $(".filter");
let filterButton = $("#filterButton");

const productBox = $("#productBox");
const cartTable = $("#cartTable");
let total = $("#total");

const disableFilters = () => {
    filters.each((index, filter) => {
        filter.setAttribute("hidden", "");
    })
}

disableFilters();

const categoryButton = $("#categoryButton");

gamesButton.click(() => {
    disableFilters();
    genres[0].removeAttribute("hidden");
    categoryButton.text("Games");
});

componentsButton.click(() => {
    disableFilters();
    components[0].removeAttribute("hidden");
    categoryButton.text("Components");
});

accessoriesButton.click(() => {
    disableFilters();
    accessories[0].removeAttribute("hidden");
    categoryButton.text("Accessories");
});

consolesButton.click(() => {
    disableFilters();
    companies[0].removeAttribute("hidden");
    categoryButton.text("Console");
});

// let content = $("#content");
let searchBar = $(".searchBar");

const render = (products) => {
    productBox.empty(); 
    products.map(product => {
        productBox.append(
            `
                <div class="col mb-3 p-2" >
                    <div class="card" style="width: 18rem;">
                        <img src="/products/${product.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <a href="/user/product/${product.id}"><h5 class="card-title">${product.name}</h5></a>
                            <p class="card-text">₹ ${product.price}</p>
                            <button type="button" class="btn btn-danger addToCart" data-productid="${product.id}" data-name="${product.name}" data-price="${product.price}">Add To Cart</button>
                                                        
                        </div>
                    </div>
                </div>    
            `
        )
    });
}



$("#consoleItemSearch").click((event) => {
    $.get("/user/getProductsHomepage?productType=console", render);
});

$("#gamesItemSearch").click((event) => {
    $.get("/user/getProductsHomepage?productType=games", render);
});

$("#accessoriesItemSearch").click((event) => {
    $.get("/user/getProductsHomepage?productType=accessories", render);
});

$("#componentsItemSearch").click((event) => {
    $.get("/user/getProductsHomepage?productType=components", render);
});

searchBar[0].children[1].addEventListener("click", (event) => {
    event.preventDefault();
    const searchField = $("#searchField").val();
    $.get("/user/getProductsSearch?name=" + searchField, render);
});


let filterForm = $("#filterForm");


filterForm.submit((event) => {
    event.preventDefault();
    $.get("/user/getProductsFiltered?productType=" + categoryButton.text().toLowerCase() + "&" + filterForm.serialize(), render);
    // genre=Platformer&genre=Shooter&productSubtype=PS1&minPrice=4000&maxPrice=5000
});

const renderCart = (cartItems) => {
    cartTable.empty();
    total.text(0);
    cartItems.map(cartItem => {
        cartTable.append(
            `
                <tr data-productid="${cartItem.product.id}" data-priceperitem="${cartItem.product.price}">
                    <td>${cartItem.product.name}</td>
                    <td>
                        <div class="btn-group dropdown">
                            <button type="button" class="btn btn-secondary dropdown-toggle" id="categoryButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                ${cartItem.quantity}
                            </button>
                            <div class="dropdown-menu">
                                <button type="button" class="dropdown-item quantitySelector">1</button>
                                <button type="button" class="dropdown-item quantitySelector">2</button>
                                <button type="button" class="dropdown-item quantitySelector">3</button>
                                <button type="button" class="dropdown-item quantitySelector">4</button>
                            </div>
                        </div>
                    </td>
                    <td>${cartItem.product.price * cartItem.quantity}</td>
                    <td><button type="button" class="btn btn-danger delete">X</button></td>
                </tr>
            `
        )
        total.text(parseInt(total.text()) + parseInt(cartItem.product.price * cartItem.quantity));
    });    
}



$.get("/user/getCartItems", renderCart);


const addToCart = (cartItem) => {
    $.post("/user/addCartItem", {
        productId: cartItem.id 
    }, () => $.get("/user/getCartItems", renderCart));
}

$(document).on("click", ".addToCart", event => {

    const cartItem = {
        id: event.target.getAttribute("data-productid"),
        name: event.target.getAttribute("data-name"),
        price: event.target.getAttribute("data-price"),
        quantity: 1,
    }
    addToCart(cartItem);
});

$(document).on("click", ".delete", event => {
    $.ajax({
        url: "/user/deleteCartItem",
        type: "DELETE",
        data: {
            productId: event.target.parentNode.parentNode.getAttribute("data-productid")
        },
        success: () => $.get("/user/getCartItems", renderCart)
        
    });
})

$(document).on("click", ".quantitySelector", event => {

    $.ajax({
        url: "/user/updateQuantity",
        type: "PATCH",
        data: {
            productId: event.target.parentNode.parentNode.parentNode.parentNode.getAttribute("data-productid"),
            quantity: event.target.innerText
        },
        success: () => $.get("/user/getCartItems", renderCart)
    })
})

