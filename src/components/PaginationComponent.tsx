'use client';

import styles from '../styles/modules/movieList.module.css';

export default function PaginationComponent({
                                                currentPage,
                                                totalPages,
                                                onPageChangeAction,
                                            }: {
    currentPage: number;
    totalPages: number;
    onPageChangeAction: (page: number) => void;
}) {
    return (
        <div className={styles.pagination}>
            <button
                onClick={() => onPageChangeAction(currentPage - 1)}
                disabled={currentPage === 1}
                className={styles.pageButton}
            >
                ← Previous
            </button>
            <span>{currentPage} of {totalPages}</span>
            <button
                onClick={() => onPageChangeAction(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={styles.pageButton}
            >
                Next →
            </button>
        </div>
    );
}
