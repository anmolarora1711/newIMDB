const details = document.querySelector('.details');

window.onload = () => {
    let url = new URL(document.location.href);
    console.log(url);
    let movieId = url.search.substring(3);
    getDetails(movieId);
};

async function getDetails(movieId){
    const res = await fetch('http://www.omdbapi.com/?apikey=559e2a75&i=' + movieId);
    const resData = await res.json();
    console.log(resData);

    if(resData.Response === 'True'){
        showDetails(resData);
    }
}

function showDetails(movie){

    const { Title, Poster, Year, Rated, Runtime, Genre, Director, Writer, Actors, Plot, Language, Country, Awards, imdbRating, BoxOffice } = movie;

    details.innerHTML = `
        <div class="left-part">
            <img class="movie-image" src="${Poster}">
        </div>
        <div class="right-part">
            <h1 class="desc-title">${Title}</h1>
            <div style="color: black;">
                <h3>${Year}</h3>
                <h3>${Rated}</h3>
            </div>
            <h3><strong>Genre: </strong>${Genre}</h3>
            <h3><strong>Runtime: </strong>${Runtime}</h3>
            <h3><strong>Director: </strong>${Director}</h3>
            <h3><strong>Writer: </strong>${Writer}</h3>
            <h3><strong>Actors: </strong>${Actors}</h3>
            <h3><strong>Plot: </strong>${Plot}</h3>
            <h3><strong>Language: </strong>${Language}</h3>
            <h3><strong>Country: </strong>${Country}</h3>
            <h3><strong>Awards: </strong>${Awards}</h3>
            <h3><strong>IMDB Rating: </strong>${imdbRating}</h3>
            <h3><strong>Box Office Collection: </strong>${BoxOffice}</h3>
        </div>
    `
    console.log(details);
}

