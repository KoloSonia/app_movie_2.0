import { searchMovies } from '../../services/api.service.ts';
import MoviesListComponent from '@/components/MoviesListComponent';

export default async function SearchPage({ searchParams }: { searchParams: { query: string } }) {
    const { results } = await searchMovies(searchParams.query, 1);

    return (
        <div className="container">
            <h1>Search Results for {searchParams.query}</h1>
            <MoviesListComponent movies={results} />
        </div>
    );
}
