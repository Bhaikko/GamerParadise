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

$.get("/vendor/getUsername", user => {
    $("#username").text("Hi " + user.companyName);
});

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

const pendingOrders = $("#pendingOrders");
const dispatchedOrders = $("#dispatchedOrders");

const renderOrders = () => {
    $.get("/vendor/getOrders", orders => {
        pendingOrders.empty();   

        orders.map(order => {
            if(order.status == "Confirmation Pending")
            {
                pendingOrders.append(
                    `
                        <div class="row p-3 bg-light">
                            <div class="row">
                                <div class="col-4"><img src="/Products/${order.product.image}" class="orderImage"></div>
                                <div class="col" style="margin-left: 5%;">
                                    
                                    <div>Name: ${order.product.name}</div>
                                    <div>Price: ${order.product.price}</div>
                                    <div>Quantity: ${order.quantity}</div>
                                    <div>Total: ${order.quantity * order.product.price}</div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <hr>
                                    <h3>Customer Details</h3>
                                    <div>
                                        <div>Name: ${order.user.name}, </div>
                                        <div>Address: ${order.user.address},</div>                           
                                        <div>Mobile: ${order.user.mobile}</div>    
                                        <div>Payment Method: ${order.method}</div> 
                                        <div>Time: ${order.time}</div> 
                                                 
                                    </div>
                                    <hr>
                                    <button type="button" class="btn btn-success orderAccept" data-orderid=${order.id}>Accept</button>
                                    <button type="button" class="btn btn-danger orderDecline" data-orderid=${order.id}>Decline</button>
                                </div>
                            </div>                            
                        </div>
                        <br>
                    `
                );
            }
            else if(order.status == "Dispatched")
            {
                dispatchedOrders.append(
                    `
                        <div class="row p-3 bg-light">
                            <div class="row">
                                <div class="col-4"><img src="/Products/${order.product.image}" class="orderImage"></div>
                                <div class="col">
                                    <div>Name: ${order.product.name}</div>
                                    <div>Price: ${order.product.price}</div>
                                    <div>Quantity: ${order.quantity}</div>
                                    <div>Total: ${order.quantity * order.product.price}</div>
                                    
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <hr>
                                    <h3>Customer Details</h3>
                                    <div>
                                        <div>Name: ${order.user.name}, </div>
                                        <div>Address: ${order.user.address},</div>                           
                                        <div>Mobile: ${order.user.mobile}</div>    
                                        <div>Payment Method: ${order.method}</div> 
                                        <div>Time: ${order.time}</div>                        
                                    </div>
                                </div>
                            </div>                            
                        </div>
                        <br>
                    `
                );
            }
        });
        
    });
}
renderOrders();


$(document).on("click", ".orderAccept", event => {
    $.ajax({
        url: "/vendor/dispatchOrder",
        data: {
            id: event.target.getAttribute("data-orderid")
        },
        type: "PATCH",
        success: () => {
            event.target.parentNode.parentNode.parentNode.remove();
            renderOrders();
        }
    });
});

$(document).on("click", ".orderDecline", event => {
    $.ajax({
        url: "/vendor/declineOrder",
        data: {
            id: event.target.getAttribute("data-orderid")
        },
        type: "PATCH",
        success: () => {
            event.target.parentNode.parentNode.parentNode.remove()
            renderOrders();
        }
    });
})


