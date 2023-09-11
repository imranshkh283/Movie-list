const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getMoviesList(APIURL);

async function getMoviesList(url) {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    showMovieList(data.results);

    paginate(data, '.pagination');
}

function showMovieList(data) {
    main.innerHTML = "";

    data.forEach((ele) => {
        const { title, poster_path, vote_average, overview } = ele;

        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML = `
        <img
            src="${IMGPATH + poster_path}"
            alt="${title}"
        />
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview:</h3>
            ${overview}
        </div>
        `;
        main.appendChild(movieEl);
    });
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

const paginate = (pages, selector) => {
    let currentPage = currentIndex = pages.page;

    let html = '<ul class="pagination-list">';
    if (currentPage > 1) {
        html += `<li>
                <span 
                class="page-link"
                onclick="getMoviesList('${APIURL}&page=${currentPage - 1}')"
                data-page="${currentPage - 1}">Previous</span></li>`;
    }
    for (let i = 1; i <= 10; i++) {
        html += `<li
        onclick="getMoviesList('${APIURL}&page=${i}')" 
        class="${i === currentIndex ? 'current' : ''}" ><span>${i}</span></li>`;
    }
    if (currentPage < 10) {
        html += `<li>
                <span 
                class="page-link"
                onclick="getMoviesList('${APIURL}&page=${currentPage + 1}')"
                data-page="${currentPage + 1}">Next</span></li>`;
    }
    html += '</ul>';
    document.querySelector(selector).innerHTML = html;
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchValue = search.value;

    if (searchValue) {
        getMoviesList(SEARCHAPI + searchValue);

        search.value = "";
    }
});


