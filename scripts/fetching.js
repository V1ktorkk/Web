
function fetchNews() {
    const url = 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI' +
        '?q=shoes' +
        '&pageNumber=1' +
        '&pageSize=10' +
        '&autoCorrect=true';

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'fe688d8b33mshcdbd95b6dfb172ep1f43d2jsn911fc7e94992',
            'X-RapidAPI-Host': 'contextualwebsearch-websearch-v1.p.rapidapi.com'
        }
    };


    fetch(url, options)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            }
            else {
                document.getElementById("fetching__error").style.display = "block";
                document.getElementById("preloader").style.display = "none";
                throw new Error("Something went wrong with API!")
            }
        })
        .then(response => {
            document.getElementById("preloader").style.display = "none";
            console.log(response.value)
            drawNews(response.value.filter((item, index) => index > Math.floor(Math.random() * 10)))
        })
        .catch(error => console.error(error));
}

function drawNews(news) {
    console.log(news)
    let innerContent = "";
    for (let i = 0; i < news.length - 1; i = i + 2) {
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

