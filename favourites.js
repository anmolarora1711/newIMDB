const removeBtn = document.getElementsByClassName('remove-btn');
const favourites = document.querySelector('.fav-list');

// array for storing the favourite movies
let favMovies;

// after loading the entire page this function will run
window.onload = () => {
    // extracting favourite movies list from localStorage
    let sessionString = localStorage.getItem('favMovies');
    favMovies = JSON.parse(sessionString);
    console.log(favMovies);

    if(!favMovies){
        return;
    }

    if(!favMovies.length){
        return;
    }

    favMovies.forEach(movie => {

        const { Poster, Title, Year, imdbID } = movie;

        // each favourite movie element
        const movieEle = document.createElement('div');
        movieEle.classList.add('movie');

        movieEle.innerHTML = `
            <img
                src="${Poster}"
                alt="${Title}"
            />
            <div class="movie-info">
                <h3>${Title}</h3>
                <span>${Year}</span>
            </div>
            <div class="movie-btns">
                <button
                    type="button"
                    name="remove-btn"
                    onclick="removeMovie(event, '${imdbID}');"
                    class="remove-btn"
                >
                    Remove
                </button>
            </div>
        `
        favourites.appendChild(movieEle);
    });
}

// function for removing movie from favourite list
function removeMovie(event, movieId){
    event.preventDefault();
    let remBtn = event.target;
    if(remBtn.classList.contains('remove-btn')){
        // will remove movie from dom
        remBtn.parentNode.parentNode.remove();
    }
    // variable to hold list of favourite movies
    let movies = JSON.parse(localStorage['favMovies']);
    for(let i = 0; i < movies.length; i++){
        if(movies[i].imdbID === movieId){
            // will remove movie from movies
            movies.splice(i, 1);
            break;
        }
    }

    // will remove movie from localStorage
    localStorage.setItem('favMovies', JSON.stringify(movies));
}