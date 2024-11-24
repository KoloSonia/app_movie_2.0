import styles from '../styles/modules/movieCard.module.css';
import {MovieDetails} from "@/models/movie.model";

export default function MovieCardComponent({ movie }: { movie: MovieDetails }) {
    return (
        <div className={styles.movieCard}>
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
        </div>
    );
}
