export interface MovieDetails {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    genres: { id: number; name: string }[];
    vote_average: number;
}

export interface MoviesResponse {
    page: number;
    results: MovieDetails[];
    total_pages: number;
}
