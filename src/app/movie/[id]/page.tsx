import { fetchMovieById } from '../../../services/api.service.ts';
import { MovieDetails } from '../../../models/movie.model';
import RatingComponent from '@/components/RatingComponent';

export default async function MovieDetailsPage({ params }: { params: { id: string } }) {
    const movieId = parseInt(params.id, 10);

    // Серверний запит
    const movie: MovieDetails = await fetchMovieById(movieId);

    return (
        <div style={{ padding: '20px' }}>
            <h1>{movie.title}</h1>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <p>{movie.overview}</p>
            <RatingComponent initialRating={movie.vote_average} />
            {movie.genres && (
                <ul>
                    {movie.genres.map((genre) => (
                        <li key={genre.id}>{genre.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}
