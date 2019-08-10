let userSignupButton = document.getElementById("userSignupButton");
let vendorSignupButton = document.getElementById("vendorSignupButton");

let userForm = document.getElementById("userForm");
let vendorForm = document.getElementById("vendorForm");

userSignupButton.addEventListener("click", () => {
    userForm.classList.remove("hide");
    vendorForm.classList.add("hide");

    userSignupButton.classList.add("btn-primary");
    userSignupButton.classList.remove("btn-secondary");

    vendorSignupButton.classList.add("btn-secondary");
    vendorSignupButton.classList.remove("btn-primary");
});

vendorSignupButton.addEventListener("click", () => {
    vendorForm.classList.remove("hide");
    userForm.classList.add("hide");

    vendorSignupButton.classList.add("btn-primary");
    vendorSignupButton.classList.remove("btn-secondary");

    userSignupButton.classList.add("btn-secondary");
    userSignupButton.classList.remove("btn-primary");
});