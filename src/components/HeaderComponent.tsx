'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/modules/header.module.css';

export default function HeaderComponent() {
    const [query, setQuery] = useState('');

    return (
        <header className={styles.header}>
            <Link href="/" className={styles.logo}>
                MoviesApp
            </Link>
            <div className={styles.search}>
                <input
                    type="text"
                    placeholder="Search movies..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Link href={`/search?query=${query}`}>
                    <button>Search</button>
                </Link>
            </div>
        </header>
    );
}
