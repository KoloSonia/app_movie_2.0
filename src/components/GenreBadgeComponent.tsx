
import React from 'react';
import { Genre } from '../models/genre.model';
import styles from '../styles/modules/genreBadge.module.css'

interface GenreBadgeProps {
    genre: Genre;
}

const GenreBadge: React.FC<GenreBadgeProps> = ({ genre }) => {
    return (
        <span className={styles.genreBadge}>
      {genre.name}
    </span>
    );
};

export default GenreBadge;
