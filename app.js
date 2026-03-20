const API_KEY = "84d05279c06a8ac0b1115ed2e0ee1af1";
const URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;

const movieContainer = document.getElementById("movieContainer");

// Obtener películas
fetch(URL)
    .then(res => res.json())
    .then(data => {
        showMovies(data.results);
    })
    .catch(err => console.error(err));

function showMovies(movies) {
    movieContainer.innerHTML = "";

    movies.forEach(movie => {

        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        const image = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/300x450";

        // Links a plataformas (búsqueda)
        const netflixLink = `https://www.netflix.com/search?q=${movie.title}`;
        const primeLink = `https://www.primevideo.com/search/ref=atv_nb_sr?phrase=${movie.title}`;

        movieCard.innerHTML = `
            <img src="${image}" alt="${movie.title}">
            <span>${movie.title}</span>
        `;

        // Click → elegir plataforma
        movieCard.addEventListener("click", () => {
            const option = confirm("¿Ver en Netflix?\nCancelar = Prime Video");

            if (option) {
                window.open(netflixLink, "_blank");
            } else {
                window.open(primeLink, "_blank");
            }
        });

        movieContainer.appendChild(movieCard);
    });
}
// Efecto interactivo con mouse (extra pro)
document.addEventListener("mousemove", (e) => {
    const camera = document.querySelector(".camera-3d");
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    camera.style.transform = `
        rotateY(${x}deg)
        rotateX(${y}deg)
    `;
});