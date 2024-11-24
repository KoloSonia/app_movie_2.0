"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchMovieById, getGenres } from "../../../services/api.service.ts";
import { MovieDetails } from "@/models/movie.model";
import styles from "../../../styles/modules/movieCard.module.css";

const MovieDetailsPage: React.FC = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState<MovieDetails | null>(null);

    useEffect(() => {
        const loadMovieDetails = async () => {
            if (!id) return;
            const fetchedMovie = await fetchMovieById(Number(id));
            const fetchedGenres = await getGenres();

            // Заміна genre_ids на назви жанрів
            if (fetchedMovie.genres) {
                fetchedMovie.genres = fetchedMovie.genres.map((genre) => {
                    const matchedGenre = fetchedGenres.find((g) => g.id === genre.id);
                    return matchedGenre ? { ...genre, name: matchedGenre.name } : genre;
                });
            }

            setMovie(fetchedMovie);
        };

        loadMovieDetails();
    }, [id]);

    if (!movie) {
        return <div>Завантаження...</div>;
    }

    return (
        <div className={styles.movieDetailsContainer}>
            <img
                className={styles.poster}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
            />
            <div className={styles.details}>
                <h1>{movie.title}</h1>
                <p className={styles.tagline}>{movie.tagline}</p>
                <p className={styles.overview}>{movie.overview}</p>
                <p>
                    <strong>Жанри: </strong>
                    {movie.genres.map((genre) => (
                        <span key={genre.id} className={styles.genreBadge}>
                            {genre.name}
                        </span>
                    ))}
                </p>
                <p>
                    <strong>Рейтинг:</strong> {movie.vote_average.toFixed(1)} / 10
                </p>
                <p>
                    <strong>Дата релізу:</strong> {movie.release_date}
                </p>
                <p>
                    <strong>Тривалість:</strong> {movie.runtime} хв.
                </p>
                <p>
                    <strong>Бюджет:</strong> ${movie.budget.toLocaleString()}
                </p>
                <p>
                    <strong>Дохід:</strong> ${movie.revenue.toLocaleString()}
                </p>
            </div>
        </div>
    );
};

export default MovieDetailsPage;
