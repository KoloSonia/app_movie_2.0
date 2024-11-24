import React from 'react';
import styles from '../styles/modules/pagination.module.css';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChangeAction: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({
                                                            currentPage,
                                                            totalPages,
                                                            onPageChangeAction,
                                                        }) => {
    if (totalPages <= 1) return null;

    const pageRange = 5; // Кількість сторінок, що відображаються
    const startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
    const endPage = Math.min(totalPages, startPage + pageRange - 1);

    const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    return (
        <div className={styles.pagination}>
            <button
                className={styles.paginationButton}
                disabled={currentPage === 1}
                onClick={() => onPageChangeAction(currentPage - 1)}
            >
                Попередня
            </button>

            {pages.map((page) => (
                <button
                    key={page}
                    className={`${styles.paginationButton} ${
                        page === currentPage ? styles.activeButton : ''
                    }`}
                    onClick={() => onPageChangeAction(page)}
                >
                    {page}
                </button>
            ))}

            <button
                className={styles.paginationButton}
                disabled={currentPage === totalPages}
                onClick={() => onPageChangeAction(currentPage + 1)}
            >
                Наступна
            </button>
        </div>
    );
};

export default PaginationComponent;
