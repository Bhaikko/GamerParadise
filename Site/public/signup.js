let userSignupButton = document.getElementById("userSignupButton");
let vendorSignupButton = document.getElementById("vendorSignupButton");

let userForm = document.getElementById("userForm");
let vendorForm = document.getElementById("vendorForm");

userSignupButton.addEventListener("click", () => {
    userForm.classList.remove("hide");
    vendorForm.classList.add("hide");

    userLoginButton.classList.add("btn-primary");
    userLoginButton.classList.remove("btn-secondary");

    vendorLoginButton.classList.add("btn-secondary");
    vendorLoginButton.classList.remove("btn-primary");
});

vendorSignupButton.addEventListener("click", () => {
    vendorForm.classList.remove("hide");
    userForm.classList.add("hide");

    vendorLoginButton.classList.add("btn-primary");
    vendorLoginButton.classList.remove("btn-secondary");

    userLoginButton.classList.add("btn-secondary");
    userLoginButton.classList.remove("btn-primary");
});