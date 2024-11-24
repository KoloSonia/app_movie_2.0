import React from 'react';
import styles from '../styles/modules/header.module.css';
import { GenreModel } from '../models/genre.model';

interface GenreDropdownProps {
    genres: GenreModel[];
    onFilterChange: (filterName: string, value: string) => void;
}

const GenreDropdownComponent: React.FC<GenreDropdownProps> = ({ genres, onFilterChange }) => {
    return (
        <div>
            <select
                className={styles.genreDropdown}
                onChange={(e) => onFilterChange('genreId', e.target.value)}
            >
                <option value="">Всі жанри</option>
                {genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>
                        {genre.name}
                    </option>
                ))}
            </select>
            <input
                type="number"
                placeholder="Рік"
                onChange={(e) => onFilterChange('year', e.target.value)}
            />
            <input
                type="number"
                placeholder="Рейтинг"
                onChange={(e) => onFilterChange('rating', e.target.value)}
            />
        </div>
    );
};

export default GenreDropdownComponent;
