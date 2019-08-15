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

const disableFilters = () => {
    filters.each((index, filter) => {
        filter.setAttribute("hidden", "");
    })
}
disableFilters();

gamesButton.click(() => {
    disableFilters();
    genres[0].removeAttribute("hidden");
});

componentsButton.click(() => {
    disableFilters();
    components[0].removeAttribute("hidden");
});

accessoriesButton.click(() => {
    disableFilters();
    accessories[0].removeAttribute("hidden");
});

consolesButton.click(() => {
    disableFilters();
    companies[0].removeAttribute("hidden");
});

let content = $("#content");
let searchBar = $(".searchBar");

filterButton.click((event) => {
    content.empty();
    event.preventDefault();

});

searchBar[0].children[1].addEventListener("click", (event) => {
    content.empty();
    event.preventDefault();
});

const productTypeGetRequest = (productType) => {
    $.get("/user/getProductsHomepage?productType=" + productType, (products) => {
        const productBox = $("#productBox");
        
        productBox.empty();
        products.map(product => {
            productBox.append(
                `
                    <div class="col mb-3 p-2" value=${product.id}>
                        <div class="card" style="width: 18rem;">
                            <img src="/products/${product.image}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <a href="/user/product/${product.id}"><h5 class="card-title">${product.name}</h5></a>
                                <p class="card-text">₹ ${product.price}</p>
                                <button type="button" class="btn btn-danger">Add To Cart</button>
                            </div>
                        </div>
                    </div>    
                `
            )
        })
    })
}

$("#consoleItemSearch").click((event) => {
    productTypeGetRequest("console");
});

$("#gamesItemSearch").click((event) => {
    productTypeGetRequest("games");
});

$("#accessoriesItemSearch").click((event) => {
    productTypeGetRequest("accessories");
});

$("#componentsItemSearch").click((event) => {
    productTypeGetRequest("components");
});


