import {MovieDetails, MoviesResponse} from "@/models/movie.model";
import {Genre} from "@/models/genre.model";

const API_BASE = 'https://api.themoviedb.org/3';
const API_KEY = '168de34fe7696bbc6a26829a8fe51e97';


export async function fetchMovieById(movieId: number): Promise<MovieDetails> {

    const response = await fetch(`${API_BASE}/movie/${movieId}?api_key=${API_KEY}`);
    if (!response.ok) {
        throw new Error('Failed to fetch movie details');
    }
    return response.json();
}


// Отримання жанрів
export const getGenres = async (): Promise<Genre[]> => {
    const response = await fetch(`${API_BASE}/genre/movie/list?api_key=${API_KEY}`);
    const data = await response.json();
    return data.genres;
};

export const getMovies_ = async (
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


export const fetchMoviesByGenre = async (genreId: string, page: number): Promise<MoviesResponse> => {
    const response = await fetch(
        `${API_BASE}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}`
    );
    return response.json();
};


export const searchMovies = async (query: string, page: number): Promise<MoviesResponse> => {
    const response = await fetch(`${API_BASE}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`);
    return response.json();
};

export async function getMovies({
                                       genreId,
                                       year,
                                       rating,
                                       page,
                                   }: {
    genreId?: string;
    year?: string;
    rating?: string;
    page?: number;
}): Promise<MoviesResponse> {
    const ratingMap: { [key: string]: string } = {
        "1...4": "1,4",
        ">5": "5,10",
        ">6": "6,10",
        ">7": "7,10",
        ">8": "8,10",
        ">9": "9,10",
    };

    const params = new URLSearchParams({
        api_key: API_KEY,
        with_genres: genreId || "",
        primary_release_year: year || "",
        "vote_average.gte": rating ? ratingMap[rating].split(",")[0] : "",
        "vote_average.lte": rating ? ratingMap[rating].split(",")[1] : "",
        page: page?.toString() || "1",
    });

    const response = await fetch(`${API_BASE}/discover/movie?${params}`);
    return response.json();
}
