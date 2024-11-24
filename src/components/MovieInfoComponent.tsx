// components/MovieInfo.tsx
import React from 'react';
import { MovieDetails } from '@/models/movie.model';
import StarsRating from '../components/StarRatingComponent';
import GenreBadge from '../components/GenreBadgeComponent';
import styles from '../styles/modules/movieInfo.module.css'; // Імпортуємо CSS файл

interface MovieInfoProps {
    movie: MovieDetails;
}

const MovieInfo: React.FC<MovieInfoProps> = ({ movie }) => {
    return (
        <div className={styles.movieInfoWrapper}>
            <img
                className={styles.moviePoster}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
            />
            <div className={styles.movieDetails}>
                <h1 className={styles.movieTitle}>{movie.title}</h1>
                <p className={styles.movieOverview}>{movie.overview}</p>
                <StarsRating rating={movie.vote_average} />
                <div className={styles.genreWrapper}>
                    {movie.genres.map((genre) => (
                        <GenreBadge key={genre.id} genre={genre} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieInfo;
