
function fetchNews() {
    fetch("https://jsonplaceholder.typicode.com/albums/1/photos")
        .then(response => {
            if (response.status === 200) {
                return response.json();
            }
            else {
                document.getElementById("fetching__error").style.display = "block";
                throw new Error("Something went wrong on API server!");
            }
        })
        .then(news => {
            document.getElementById("preloader").style.display = "none";
            console.log(news);
            drawNews(news.filter(item => item.id > Math.floor(Math.random() * 50)));
        })
        .catch(error => console.error(error));
}

function drawNews(news) {
    let innerContent = "";
    for (let i = 0; i < news.length - 20; i = i + 2) {
        innerContent += `<div class="news">
                            <div class = "item">
                                <p> ${news[i].title} </p>
                                <a href = "#"><img src="${news[i].url}" alt = "shoes"></a>
                            </div>
                            <div class = "item">
                                <p> ${news[i + 1].title} </p>
                                <a href = "#"><img src="${news[i + 1].url}" alt = "shoes"></a>
                            </div>
                        </div>`
    }
    document.getElementById("news_wrapper").innerHTML += innerContent;
}

function ready() {
    fetchNews();
}

document.addEventListener("DOMContentLoaded", ready);

