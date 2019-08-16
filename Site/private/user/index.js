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

let content = $("#content");
let searchBar = $(".searchBar");


const render = (products) => {
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