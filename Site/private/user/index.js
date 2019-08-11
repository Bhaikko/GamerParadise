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

})



