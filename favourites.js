const removeBtn = document.getElementsByClassName('remove-btn');
const favourites = document.querySelector('.fav-list');

let favMovies;

window.onload = () => {
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
    return;
}

function removeMovie(event, movieId){
    event.preventDefault();
    let remBtn = event.target;
    if(remBtn.classList.contains('remove-btn')){
        remBtn.parentNode.parentNode.remove();
    }
    let movies = JSON.parse(localStorage['favMovies']);
    for(let i = 0; i < movies.length; i++){
        console.log(movies[i].imdbID);
        if(movies[i].imdbID === movieId){
            console.log('hello');
            movies.splice(i, 1);
            break;
        }
    }
    localStorage.setItem('favMovies', JSON.stringify(movies));
}