"use client";

import React, { useState, useEffect } from "react";
import MoviesListComponent from "@/components/MoviesListComponent";
import GenreDropdownComponent from "@/components/GenreDropdownComponent";
import PaginationComponent from "@/components/PaginationComponent";
import { getMovies, getGenres } from "../services/api.service.ts";
import { MovieDetails } from "@/models/movie.model";
import styles from "../styles/modules/filter.module.css";
import {Genre} from "@/models/genre.model";

export default function HomePage() {
    const [movies, setMovies] = useState<MovieDetails[]>([]);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [filters, setFilters] = useState({
        genreId: "",
        year: "",
        rating: "",
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const loadMovies = async () => {
            const { results, total_pages } = await getMovies({
                genreId: filters.genreId,
                year: filters.year,
                rating: filters.rating,
                page: currentPage,
            });
            setMovies(results);
            setTotalPages(total_pages);
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
        setCurrentPage(1);
    };

    const handleResetFilters = () => {
        setFilters({
            genreId: "",
            year: "",
            rating: "",
        });
        setCurrentPage(1);
    };

    return (
        <div>
            <div className={styles.filterRow}>
                <GenreDropdownComponent
                    genres={genres}
                    onFilterChange={handleFilterChange}
                />
                <div className={styles.filterItem}>
                    <label htmlFor="yearFilter">Рік:</label>
                    <select
                        id="yearFilter"
                        className={styles.filterSelect}
                        onChange={(e) => handleFilterChange("year", e.target.value)}
                        value={filters.year}
                    >
                        <option value="">Всі роки</option>
                        {Array.from({length: 2025 - 1920 + 1}, (_, i) => 1920 + i).map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles.filterItem}>
                    <label htmlFor="ratingFilter">Рейтинг:</label>
                    <select
                        id="ratingFilter"
                        className={styles.filterSelect}
                        onChange={(e) => handleFilterChange("rating", e.target.value)}
                        value={filters.rating}
                    >
                        <option value="">Всі рейтинги</option>
                        <option value="1...4">1...4</option>
                        <option value=">5">Більше 5</option>
                        <option value=">6">Більше 6</option>
                        <option value=">7">Більше 7</option>
                        <option value=">8">Більше 8</option>
                        <option value=">9">Більше 9</option>
                    </select>
                </div>
                <button
                    className={styles.resetButton}
                    onClick={handleResetFilters}
                >
                    Очистити фільтри
                </button>
            </div>
            <h1>Фільми</h1>
            <MoviesListComponent movies={movies} genres={genres}/>
            <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChangeAction={handlePageChange}
            />
        </div>
    );
}
