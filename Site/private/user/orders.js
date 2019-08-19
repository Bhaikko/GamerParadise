const ordersContainer = $("#orders");

$.get("/user/getUsername", user => {
    $("#username").text("Hi " + user.name);
});

$.get("/user/getOrders", orders => {
    console.log(orders);
    ordersContainer.empty()
    orders.map(order => {
        ordersContainer.append(
            `
                <div class="order text-light">
                    <div class="time ml-3"><b>Ordered Placed: ${order.time}</b></div>
                    <div class="name ml-3">Signed By: ${order.user.name}</div>
                    <div class="container mt-3">
                        <div class="row">
                            <div class="col-6">
                                <img src="/products/${order.product.image}" class="orderImage">
                            </div>
                            <div class="col-3">
                                <div class="orderName"><a href="/user/product.html?productId=${order.product.id}"><b>${order.product.name}</b></a></div>
                                <div class="price">Price: ₹ ${order.product.price}</div>
                                <div class="price">Quantity: ${order.quantity}</div>
                                <div class="price">Total: ₹ ${order.product.price * order.quantity}</div>
                                <br>
                                <div class="vendorName">Sold By: ${order.vendor.companyName}</div>
                                <div class="vendorName">Vendor Mobile: ${order.vendor.companyMobile}</div>
                                <div class="vendorName">Vendor Email Address: ${order.vendor.companyEmail}</div>
                                
                                
                            </div>
                            <div class="col-3">
                                <button class="btn btn-outline-info my-2 my-sm-0" data-productid=${order.product.id} id="reviewButton">Write A Product Review</button>
                            </div>
                        </div>
                    </div>
                </div>
            `
        )
    })
});

$(document).on("click", "#reviewButton", (event) => {
    window.location = "/user/product.html?productId=" + event.target.getAttribute("data-productid");
})

