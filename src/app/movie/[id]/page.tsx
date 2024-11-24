"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import MovieInfo from "@/components/MovieInfoComponent";
import { fetchMovieById } from "@/services/api.service.ts";
import { MovieDetails } from "@/models/movie.model";
import styles from "../../../styles/modules/movieInfo.module.css";

const MoviePage = () => {
    const [movie, setMovie] = useState<MovieDetails | null>(null);
    const params = useParams();
    const { id } = params;

    useEffect(() => {
        if (id) {
            const fetchMovie = async () => {
                try {
                    const movieDetails = await fetchMovieById(+id);
                    setMovie(movieDetails);
                } catch (error) {
                    console.error("Помилка при завантаженні фільму:", error);
                }
            };
            fetchMovie();
        }
    }, [id]);

    if (!movie) {
        return <div className={styles.loading}>Завантаження...</div>;
    }

    return (
        <div className={styles.moviePageContainer}>
            <MovieInfo movie={movie} />
        </div>
    );
};

export default MoviePage;
