const cartTable = $("#cartTable");
const total = $("#total");

$.get("/user/getOrderDetails", orders => {
    // console.log(order);
    orders.map(order => {
        cartTable.append(
            `   
                <tr>
                    <td>${order.product.name}</td>
                    <td>${order.quantity}</td>
                    <td>${order.product.price}</td>
                    <td>${order.product.vendor.companyName}</td>
                </tr>
                
            `
        );
        total.text(parseInt(total.text()) + parseInt(parseInt(order.product.price) * parseInt(order.quantity)));
    });

});

let orderForm = $("#orderForm");
orderForm.submit((event) => {
    event.preventDefault();
    $("#finalText").modal("show");
    setTimeout(() => {
        orderForm[0].submit();
    }, 2000);
});

let creditCardRadio = $("#creditCard");
let codRadio = $("#cod");

creditCardRadio.click(() => {
    $("#creditNumber").attr("required", "");
    $("#expiry").attr("required", "");
    $("#cvv").attr("required", "");
});

codRadio.click(() => {
    $("#creditNumber").removeAttr("required", "");
    $("#expiry").removeAttr("required", "");
    $("#cvv").removeAttr("required", "");
})



