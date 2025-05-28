import React, { useState } from "react";
import { searchImages } from "../services/unsplashApi";

function SearchBar({ onSearchResults, onLoadingChange }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    onLoadingChange(true);
    try {
      const results = await searchImages(searchTerm);
      onSearchResults(results);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      onLoadingChange(false);
    }
  };

  return (
    <form onSubmit={handleSearch} className="search-form">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for images..."
        className="search-input"
      />
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
