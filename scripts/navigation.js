function ready() {
    if (document.location.href.includes("/account.html")){
        document.getElementById("accounts").classList.add("click_account")
    }
    if (document.location.href.includes("/magazine.html")){
        document.getElementById("click_trash").setAttribute("src", "/pictures/trashhh.svg")
    }
}

document.addEventListener("DOMContentLoaded", ready);