"use client";

import Link from 'next/link';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/styles/modules/header.module.css";

const HeaderComponent: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const handleSearch = () => {
        if (searchQuery.trim() !== "") {
            router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <header className={styles.header}>
            <div className={styles.logo}>🎬 MovieApp</div>
            <nav className={styles.nav}>
                <Link href="/">Головна</Link>
                <Link href="/about">Про нас</Link>
            </nav>
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Пошук фільмів..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className={styles.searchInput}
                />
                <button onClick={handleSearch} className={styles.searchButton}>
                    Пошук
                </button>
            </div>
        </header>
    );
};

export default HeaderComponent;
