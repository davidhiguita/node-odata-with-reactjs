// @vendors
import React from 'react';

// @odata helper
import { filterByFields } from '../../odata-middleware';

// @styles
import './style.scss';

const URL = 'http://localhost:1945/books';

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

  const filterBy = () => {
    const clearFilters = {};
    Object.entries(filters)
      .filter(([_, info]) => !!info)
      .forEach(([filterName, info]) => {
        clearFilters[filterName] = info;
      })
    filterByFields({
      callback: (query, results) => {
        setQuery(query);
        setResults(results);
      },
      fields: clearFilters,
      url: URL
    });
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

      <div className="filter-button">
        <button
          onClick={filterBy}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default Filters;
