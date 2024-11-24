import {MovieDetails, MoviesResponse} from "@/models/movie.model";
import {GenreModel} from "@/models/genre.model";

const API_BASE = 'https://api.themoviedb.org/3';
const API_KEY = '168de34fe7696bbc6a26829a8fe51e97';

export async function fetchPopularMovies(): Promise<MovieDetails[]> {
    const response = await fetch(
        `${API_BASE}/movie/popular?api_key=${API_KEY}`
    );
    const data = await response.json();
    console.log(data); // Додайте це для перевірки структури
    return data.results || data;
};

export async function fetchMovieById(movieId: number): Promise<MovieDetails> {

    const response = await fetch(`${API_BASE}/movie/${movieId}?api_key=${API_KEY}`);
    if (!response.ok) {
        throw new Error('Failed to fetch movie details');
    }
    return response.json();
}


export const fetchGenres = async (): Promise<GenreModel[]> => {
    const response = await fetch(`${API_BASE}/genre/movie/list?api_key=${API_KEY}`);
    const data = await response.json();
    return data.genres;
};

// Отримання жанрів
export const getGenres = async (): Promise<GenreModel[]> => {
    const response = await fetch(`${API_BASE}/genre/movie/list?api_key=${API_KEY}`);
    const data = await response.json();
    return data.genres;
};

export const filterMovies = async (
    genreId?: string,
    year?: string,
    rating?: string,
    page: number = 1
): Promise<MoviesResponse> => {
    const url = new URL(`${API_BASE}/discover/movie`);
    url.searchParams.set('api_key', API_KEY);

    // Додавання фільтрів до запиту, якщо вони є
    if (genreId) url.searchParams.set('with_genres', genreId);
    if (year) url.searchParams.set('primary_release_year', year);
    if (rating) url.searchParams.set('vote_average.gte', rating);
    url.searchParams.set('page', page.toString());

    const response = await fetch(url.toString());
    if (!response.ok) {
        throw new Error('Failed to fetch filtered movies');
    }
    return response.json();
};
// Отримання фільмів
export const getMovies = async (page: number = 1): Promise<MoviesResponse> => {
    const response = await fetch(`${API_BASE}/movie/popular?api_key=${API_KEY}&page=${page}`);
    const data = await response.json();
    return data;
};

export const fetchMoviesByGenre = async (genreId: string, page: number): Promise<MoviesResponse> => {
    const response = await fetch(
        `${API_BASE}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}`
    );
    return response.json();
};

export const fetchMovieDetails = async (movieId: number): Promise<MovieDetails> => {
    const response = await fetch(`${API_BASE}/movie/${movieId}?api_key=${API_KEY}`);
    return response.json();
};

export const searchMovies = async (query: string, page: number): Promise<MoviesResponse> => {
    const response = await fetch(`${API_BASE}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`);
    return response.json();
};
