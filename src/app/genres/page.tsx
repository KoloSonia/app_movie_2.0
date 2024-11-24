import { fetchMoviesByGenre } from '../../services/api.service.ts';
import MoviesListComponent from '@/components/MoviesListComponent';

export default async function GenrePage({ searchParams }: { searchParams: { genre: string } }) {
    const { results } = await fetchMoviesByGenre(searchParams.genre, 1);

    return (
        <div className="container">
            <h1>Genre: {searchParams.genre}</h1>
            <MoviesListComponent movies={results} genres={[]}/>
        </div>
    );
}
