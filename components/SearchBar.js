import { useState, useEffect } from "react";
import { CiSearch, CiLogout } from "react-icons/ci";
import styles from "../styles/SearchBar.module.css";
import Image from "next/image";

function SearchBar({ onSearch, userName, onLogout, initialQuery = "" }) {
  const [value, setValue] = useState(initialQuery);

  useEffect(() => {
    setValue(initialQuery);
  }, [initialQuery]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSearch = () => {
    onSearch(value); 
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className={styles.searchContainer}>
      <button onClick={handleSearch} className={styles.searchBtn}>
        <CiSearch />
      </button>
      <input
        type="text"
        placeholder="جستجوی کالا..."
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        className={styles.searchInput}
      />
      <span className={styles.userInfo}>
        <Image
          src={`https://avatar.iran.liara.run/username?username=${userName}`}
          alt="avatar"
          width={40}
          height={40}
          unoptimized
        />
        <span>
          <h4>{userName}</h4>
          <p>مدیر</p>
        </span>
      </span>
      <button onClick={onLogout} className={styles.logoutBtn}>
        <CiLogout />
      </button>
    </div>
  );
}

export default SearchBar;
