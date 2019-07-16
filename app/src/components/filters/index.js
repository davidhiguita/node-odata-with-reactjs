// @vendors
import React from 'react';

// @styles
import './style.scss';

const Filters = ({
  booksFields,
  filters,
  setFilter,
  setQuery,
  setResults
}) => {
  const setFilters = (filterName) => (event) => {
    const newFilters = { ...filters };
    newFilters[filterName] = event.target.value;
    setFilter(newFilters);
  };

  return (
    <div className="app__filters">
      {booksFields.map((filterName, index) => (
        <div
          className={`filter-${filterName}`}
          key={`filter-${filterName}`}
        >
          <input
            onChange={setFilters(filterName)}
            placeholder={filterName}
            value={filters[filterName]}
          />
        </div>
      ))}
    </div>
  );
}

export default Filters;
