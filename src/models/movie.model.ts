import {Genre} from "@/models/genre.model";


export interface MovieDetails {
    id: number;
    title: string;
    tagline: string; // Лозунг фільму
    overview: string; // Опис фільму
    release_date: string; // Дата виходу
    vote_average: number; // Середній рейтинг
    vote_count: number; // Кількість голосів
    poster_path: string; // URL постера
    backdrop_path: string; // URL фонового зображення
    genres: Genre[]; // Список жанрів
    runtime: number; // Тривалість фільму в хвилинах
    budget: number; // Бюджет фільму
    revenue: number; // Дохід
    production_companies: { // Виробничі компанії
        id: number;
        name: string;
        logo_path: string | null;
        origin_country: string;
    }[];
    production_countries: { // Країни виробництва
        iso_3166_1: string;
        name: string;
    }[];
    spoken_languages: { // Мови
        iso_639_1: string;
        name: string;
    }[];
    popularity: number; // Популярність
}

export interface MoviesResponse {
    page: number;
    results: MovieDetails[];
    total_pages: number;
}
