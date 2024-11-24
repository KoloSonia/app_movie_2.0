import React from "react";
import styles from "../styles/modules/filter.module.css";

interface YearFilterProps {
    onFilterChange: (filterName: string, value: string) => void;
}

const YearFilter: React.FC<YearFilterProps> = ({ onFilterChange }) => {
    const years = Array.from({ length: 2025 - 1920 + 1 }, (_, i) => 1920 + i);

    return (
        <div className={styles.filterItem}>
            <label htmlFor="yearFilter" className={styles.filterLabel}>
                Рік:
            </label>
            <select
                id="yearFilter"
                className={styles.filterSelect}
                onChange={(e) => onFilterChange("year", e.target.value)}
            >
                <option value="">Всі роки</option>
                {years.map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default YearFilter;
