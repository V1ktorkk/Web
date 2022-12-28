if (localStorage.getItem("interests") === null) {
    localStorage.setItem("interests", JSON.stringify([]))
}
const interests = JSON.parse(localStorage.getItem("interests"))

function renderInterests() {
    const interestContainer = document.getElementById("interest-container")
    let newContent = ""
    for (let interest in interests) {
        newContent += "<div class=\"interest-container__interest\">"+ interests[interest].value + "<br>" + normalDate(new Date((interests[interest].date))) +"</div>"
    }
    interestContainer.innerHTML = newContent
}
function isNormal(str) {
    if (str.trim() === '')
        return false;
    return true;
}
function submitInterest(event) {
    event.preventDefault()
    const interestField = document.getElementById("interest-field")
    let obj = {

        value: interestField.value,
        date: new Date().getTime()
    }
    if (isNormal(interestField.value)) {
        interests.push(obj)
        localStorage.setItem("interests", JSON.stringify(interests))
        console.log(localStorage.getItem("interests"))
        interestField.value = ""
        renderInterests()
    }
}


function normalDate(date) {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}  ${date.getHours()}:${date.getMinutes()}`
}

function ready() {
    const form = document.querySelector('form')
    form.addEventListener('submit', submitInterest)
    renderInterests()
}

document.addEventListener("DOMContentLoaded", ready);