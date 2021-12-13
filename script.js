const APIKEY = '559e2a75';
const APIURL = 'http://www.omdbapi.com/?apikey=' + APIKEY;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const heading = document.querySelector('.heading');

const mydata = new Object();

// on submitting the name for movie in search Box
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value.trim();

    // validation
    if(searchTerm){
        getMovies(searchTerm);
        search.value = '';
    }else{
        return alert('Please provide a name to search');
    }
});

// function to get movies from fetch request
async function getMovies(searchTerm) {
    
    const res = await fetch(APIURL + `&s=${searchTerm}`);
    const resData = await res.json();

    // validation
    if(resData.Response === "True"){
        mydata.movies = resData.Search;
        heading.setAttribute('hidden', 'true');
        heading.removeAttribute('hidden');
        showMovies(resData.Search);
    }else{
        return alert('Movie is not available');
    }
}

// function to show list of movies
function showMovies(movies){

    main.innerHTML = '';

    movies.forEach(movie => {

        const { Poster, Title, Year, imdbID } = movie;

        // each movie element
        const movieEle = document.createElement('div');
        movieEle.classList.add('movie');

        movieEle.innerHTML = `
            <img
                src="${Poster}" alt="${Title}"
            />
            <div class="movie-info">
                <h3>${Title}</h3>
                <span>${Year}</span>
            </div>
            <div class="movie-btns">
                <a
                    href="description.html?t=${imdbID}" class="details-btn">
                        Details
                </a>
                <button
                    type="button"
                    class="add-btn"
                    onclick="addToFav(event, '${imdbID}');">
                        Add To Favourites
                </button>
            </div>
        `

        main.appendChild(movieEle);
    });
}

// function for adding movie to favourites list in localStorage
function addToFav(event, movieId){
    let movies = JSON.parse(localStorage.getItem('favMovies'));
    console.log(typeof movies);
    if(!movies){
        mydata.movies.forEach(movie => {
            if(movie.imdbID == movieId){
                movies = [];
                movies.push(movie);
                alert('Movie successfully added to favourites');
            }
        });
    }else{
        mydata.movies.forEach(movie => {
            if(!movies.includes(movie) && movie.imdbID == movieId){
                movies.push(movie);
                alert('Movie successfully added to favourites');
            }
        });
    }
    localStorage.setItem('favMovies', JSON.stringify(movies));
}