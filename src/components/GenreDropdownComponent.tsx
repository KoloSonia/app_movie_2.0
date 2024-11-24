import React from "react";
import { Genre } from "@/models/genre.model";
import styles from "../styles/modules/filter.module.css";

interface GenreDropdownProps {
    genres: Genre[];
    onFilterChange: (filterName: string, value: string) => void;
}

const GenreDropdownComponent: React.FC<GenreDropdownProps> = ({ genres, onFilterChange }) => {
    return (
        <div className={styles.filterItem}>
            <label htmlFor="genreFilter" className={styles.filterLabel}>
                Жанр:
            </label>
            <select
                id="genreFilter"
                className={styles.filterSelect}
                onChange={(e) => onFilterChange("genreId", e.target.value)}
            >
                <option value="">Всі жанри</option>
                {genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>
                        {genre.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default GenreDropdownComponent;
