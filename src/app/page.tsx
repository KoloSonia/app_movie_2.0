"use client"

import React, { useState, useEffect } from 'react';
import MoviesListComponent from '@/components/MoviesListComponent';
import GenreDropdownComponent from '@/components/GenreDropdownComponent';
import PaginationComponent from '@/components/PaginationComponent';
import { filterMovies, getGenres } from '../services/api.service.ts';
import {MovieDetails} from "@/models/movie.model";
import {GenreModel} from "@/models/genre.model"; // Виправлено назви імпортів

export default function HomePage() {
    const [movies, setMovies] = useState<MovieDetails[]>([]);
    const [genres, setGenres] = useState<GenreModel[]>([]);
    const [filters, setFilters] = useState({
        genreId: '',
        year: '',
        rating: '',
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const loadMovies = async () => {
            const { results, total_pages } = await filterMovies(
                filters.genreId, // Передаємо кожен фільтр
                filters.year,
                filters.rating,
                currentPage
            );
            if (results && Array.isArray(results)) {
                setMovies(results);
                setTotalPages(total_pages);
            } else {
                setMovies([]); // Якщо results немає, відображаємо порожній масив
                setTotalPages(1); // Якщо немає сторінок, встановлюємо 1
            }
        };

        const loadGenres = async () => {
            const fetchedGenres = await getGenres();
            setGenres(fetchedGenres);
        };

        loadMovies();
        loadGenres();
    }, [currentPage, filters]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleFilterChange = (filterName: string, value: string) => {
        setFilters({ ...filters, [filterName]: value });
        setCurrentPage(1); // Повернутись до першої сторінки при зміні фільтрів
    };

    return (
        <div>
            <h1>Фільми</h1>
            <GenreDropdownComponent
                genres={genres}
                onFilterChange={handleFilterChange}
            />
            <MoviesListComponent movies={movies} />
            <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChangeAction={handlePageChange}
            />
        </div>
    );
}
