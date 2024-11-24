import React from 'react';
import Link from 'next/link';
import styles from '../styles/modules/movieList.module.css';
import {MovieDetails} from "@/models/movie.model";

interface MoviesListProps {
    movies: MovieDetails[];
}

const MoviesListComponent: React.FC<MoviesListProps> = ({movies}) => {
    if (!movies || movies.length === 0) {
        return <div>Немає фільмів для показу</div>;
    }
    return (
        <div className={styles.movieListContainer}>
            {movies && movies.length > 0 ? (
                movies.map((movie) => (

                    <Link href={`/movie/${movie.id}`} key={movie.id}>
                        <div className={styles.movieCard}>
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
                            <div className={styles.movieGenres}>
                                {movie.genres.map((genre) => (
                                    <span key={genre.id} className={styles.genreBadge}>
                  {genre.id}
                </span>
                                ))}
                            </div>
                            <div className={styles.movieCardContent}>
                                <h3>{movie.title}</h3>
                                <p>Рейтинг: {movie.vote_average.toFixed(1)}</p>
                            </div>
                        </div>
                    </Link>
                ))
            ) : (
                <p>Немає фільмів для показу.</p>
            )}
        </div>
    );
};

export default MoviesListComponent;
