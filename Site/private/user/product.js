const urlArray = window.location.href.split("/");
const lastUrl = urlArray[urlArray.length - 1];
const id = lastUrl.split("?")[1].split("=")[1]; 


$.get("/user/getProductDetails/" + id, (productDetails) => {
    console.log(productDetails);
    let productBox = $("#productBox");
    productBox.empty();
    productBox.append(
        `
            <div class="col-4">
                <img src="/products/${productDetails.image}" class="orderImage">
            </div>
            <div class="col-4">
                <div><u>Name: </u><h3>${productDetails.name}</h3></div>
                <div><u>Price: </u><h4>${productDetails.price}</h4></div>
                <div><u>Vendor: </u><h4>${productDetails.vendor.companyName}</h4></div>
            
                <button type="button" class="btn btn-danger" id="addToCart">Add To Cart</button>
                <button type="button" class="btn btn-warning" id="addReviewButton">Add Review</button>
            </div>
            <div class="col-4">
                <div class="reviews">
                    <h3>Reviews</h3>
                    <hr>
                    <div class="review">
                        <span><h5>Bhaikko </h5><span>* * * *</span></span>
                        <br>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus commodi ducimus nulla iusto pariatur, ullam dicta laborum sapiente aliquam exercitationem dolor asperiores optio rerum. Alias dolorum maiores culpa dignissimos. Fugiat.</p>
                    </div>
                    <hr>
                    <div class="review">
                        <span><h5>Bhaikko </h5><span>* * * *</span></span>
                        <br>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus commodi ducimus nulla iusto pariatur, ullam dicta laborum sapiente aliquam exercitationem dolor asperiores optio rerum. Alias dolorum maiores culpa dignissimos. Fugiat.</p>
                    </div>
                    <hr>
                    
                </div>
            </div>    
        `
    )
})