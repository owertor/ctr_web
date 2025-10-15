import React from 'react';

const SearchBar = ({ searchTerm, onSearch, onClear, totalCount, filteredCount }) => {
  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };

  const handleClear = () => {
    onClear();
  };

  return (
    <div className="search-bar">
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Search by name, email, or ID..."
          value={searchTerm}
          onChange={handleInputChange}
          className="search-input"
        />
        {searchTerm && (
          <button onClick={handleClear} className="clear-search" title="Clear search">
            ×
          </button>
        )}
      </div>
      
      <div className="search-info">
        {searchTerm ? (
          <span>
            Showing {filteredCount} of {totalCount} entities
            {filteredCount !== totalCount && (
              <button onClick={handleClear} className="show-all-btn">
                Show all
              </button>
            )}
          </span>
        ) : (
          <span>Total: {totalCount} entities</span>
        )}
      </div>
    </div>
  );
};

export default SearchBar;