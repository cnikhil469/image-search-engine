import React, { useState } from "react";
import { searchImages } from "../services/unsplashApi";

function SearchBar({ onSearchResults, onLoadingChange, onQueryChange, onError }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    onLoadingChange(true);
    onError(null);
    try {
      const response = await searchImages(searchTerm);
      onSearchResults(response.results, response.total);
      onQueryChange(searchTerm);
    } catch (error) {
      console.error("Error:", error);
      onError("Failed to fetch images. Please check your connection and try again.");
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
