function ready() {
    if (document.location.href.includes("/account.html")){
        document.getElementById("accounts").classList.add("click_account")
        //document.getElementById("accounts").setAttribute("src", "/pictures/click_account.svg")
    }
}

document.addEventListener("DOMContentLoaded", ready);