import React from "react";
import styles from '../styles/modules/filter.module.css';

interface RatingFilterProps {
    onFilterChange: (filterName: string, value: string) => void;
}

const RatingFilter: React.FC<RatingFilterProps> = ({ onFilterChange }) => {
    const ratings = ["1...4", ">5", ">6", ">7", ">8", ">9"];

    return (
        <div className={styles.filterItem}>
            <label htmlFor="ratingFilter" className={styles.filterLabel}>
                Рейтинг:
            </label>
            <select
                id="ratingFilter"
                className={styles.filterSelect}
                onChange={(e) => onFilterChange("rating", e.target.value)}
            >
                <option value="">Всі рейтинги</option>
                {ratings.map((rating) => (
                    <option key={rating} value={rating}>
                        {rating}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default RatingFilter;
