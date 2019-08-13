let genres = $("#genres");
let components = $("#components");
let accessories = $("#accessories");
let companies = $("#companies");

let categoryButton = $("#categoryButton");
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

let productType = null;

gamesButton.click(() => {
    disableFilters();
    genres[0].removeAttribute("hidden");
    categoryButton.text(gamesButton.text());
    productType = "games";
});

componentsButton.click(() => {
    disableFilters();
    components[0].removeAttribute("hidden");
    categoryButton.text(componentsButton.text());
    productType = "components";

});

accessoriesButton.click(() => {
    disableFilters();
    accessories[0].removeAttribute("hidden");
    categoryButton.text(accessoriesButton.text());

    productType = "accessories";
});

consolesButton.click(() => {
    disableFilters();
    companies[0].removeAttribute("hidden");
    categoryButton.text(consolesButton.text());
    productType = "console";
});

$("#newItemForm").submit((event) => {
    $("<input />").attr("type", "hidden")
        .attr("name", "productType")
        .attr("value", productType)
        .appendTo("#newItemForm");

    return true;
});

