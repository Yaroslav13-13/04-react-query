import React, { useState } from "react";
import type { Movie } from "../../types/movie";
import styles from "./Hero.module.css"; // правильно підключаємо свій CSS

interface HeroProps {
  onSearch: (query: string) => void;
  heroMovie: Movie; // популярний фільм для фонового банера
}

export default function Hero({ onSearch, heroMovie }: HeroProps) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(inputValue);
    }
  };

  const handleClick = () => {
    onSearch(inputValue);
  };

  return (
    <div
      className={styles.hero}
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}")`,
      }}
    >
      <div className={styles.overlay}>
        <h1 className={styles.title}>Find Your Movie</h1>
        <p className={styles.subtitle}>Enter movie title and hit search</p>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Movie title..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleClick}>Search</button>
        </div>
      </div>
    </div>
  );
}
