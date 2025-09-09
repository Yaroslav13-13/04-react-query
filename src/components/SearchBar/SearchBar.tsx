// import styles from "./SearchBar.module.css";
// import { toast } from "react-hot-toast";

// interface SearchBarProps {
//   onSubmit: (query: string) => void;
// }

// export default function SearchBar({ onSubmit }: SearchBarProps) {
//   async function handleAction(formData: FormData) {
//     const query = formData.get("query")?.toString().trim();

//     if (!query) {
//       toast.error("Please enter your search query.");
//       return;
//     }

//     onSubmit(query);
//   }

//   return (
//     <header className={styles.header}>
//       <div className={styles.container}>
//         <a
//           className={styles.link}
//           href="https://www.themoviedb.org/"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Powered by TMDB
//         </a>
//         <form className={styles.form} action={handleAction}>
//           <input
//             className={styles.input}
//             type="text"
//             name="query"
//             autoComplete="off"
//             placeholder="Search movies..."
//             autoFocus
//           />
//           <button className={styles.button} type="submit">
//             Search
//           </button>
//         </form>
//       </div>
//     </header>
//   );
// }

import { useState, useEffect } from "react";
import styles from "./SearchBar.module.css";
import { toast } from "react-hot-toast";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const placeholderOptions = [
    "Search for a movie...",
    "Type a movie or actor...",
    "Find your favorite film...",
    "What do you want to watch today?",
  ];

  const [placeholder, setPlaceholder] = useState("");
  const [optionIndex, setOptionIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const currentOption = placeholderOptions[optionIndex];
    let timer: NodeJS.Timeout;

    if (typing) {
      if (charIndex < currentOption.length) {
        timer = setTimeout(() => setCharIndex(charIndex + 1), 150);
      } else {
        setTyping(false);
        timer = setTimeout(() => setCharIndex(charIndex - 1), 1000);
      }
    } else {
      if (charIndex > 0) {
        timer = setTimeout(() => setCharIndex(charIndex - 1), 100);
      } else {
        setTyping(true);
        setOptionIndex((optionIndex + 1) % placeholderOptions.length);
      }
    }

    setPlaceholder(currentOption.slice(0, charIndex));

    return () => clearTimeout(timer);
  }, [charIndex, typing, optionIndex]);

  async function handleAction(formData: FormData) {
    const query = formData.get("query")?.toString().trim();

    if (!query) {
      toast.error("Please enter your search query.");
      return;
    }

    onSubmit(query);
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <form className={styles.form} action={handleAction}>
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder={placeholder}
            autoFocus
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
