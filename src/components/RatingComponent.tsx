'use client';

import { useState } from 'react';
import styles from '../styles/modules/movieCard.module.css';

export default function RatingComponent({ initialRating }: { initialRating: number }) {
    const [rating, setRating] = useState(initialRating);

    const handleRating = (value: number) => {
        setRating(value);
    };

    return (
        <div className={styles.rating}>
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    className={star <= rating ? styles.filledStar : styles.emptyStar}
                    onClick={() => handleRating(star)}
                >
          ★
        </span>
            ))}
        </div>
    );
}
