// @vendors
import React, { useState } from 'react';

// @odata helper
import { filterByFields } from '../../odata-middleware';

// @styles
import './style.scss';

const initialFilterState = {
  title: ''
};

const URL = 'http://localhost:1945/books';

const Filters = ({
  setQuery,
  setResults
}) => {
  const [filters, setFilter] = useState({ ...initialFilterState });

  const setFilters = (filterName) => (event) => {
    const newFilters = { ...filters };
    newFilters[filterName] = event.target.value;
    setFilter(newFilters);
  };

  const filterBy = () => {
    console.log('filterBy  ', filters);
    filterByFields({ fields: filters, url: URL });
  };

  return (
    <div className="app__filters">
      <div className="filter-title">
        <input
          onChange={setFilters('title')}
          placeholder="Title"
          value={filters.title}
        />
      </div>

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
