// @vendors
import React, { useState } from 'react';
import ReactJson from 'react-json-view'

//@components
import Filters from './components/filters';
import Fields from './components/fields';

// @utils
import { getInfo } from './odata-middleware';

// @styles
import './style.scss';

const URL = 'http://localhost:1945';

const booksFields = [
  'author',
  'description',
  'genre',
  'price',
  'publish_date',
  'title',
  'id'
];

const initialFilterState = {
  author: '',
  description: '',
  genre: '',
  price: '',
  publish_date: '',
  title: '',
  id: ''
};

const initialFieldsState = {
  author: false,
  description: false,
  genre: false,
  price: false,
  publish_date: false,
  title: false,
  id: false
};

const App = () => {
  const [fields, setFields] = useState({ ...initialFieldsState });
  const [filters, setFilter] = useState({ ...initialFilterState });
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");

  return (
    <div className="app">
      <div className="app__query">
        {query}
      </div>

      <Filters
        booksFields={booksFields}
        filters={filters}
        setFilter={setFilter}
        setQuery={setQuery}
        setResults={setResults}
      />
      <Fields
        booksFields={booksFields}
        fields={fields}
        setFields={setFields}
        setQuery={setQuery}
        setResults={setResults}
      />

      <div className="app__mixed-buttons">
        <div className="select-and-filter-button">
          <button
            onClick={() => {
              const checkedFields = Object.keys(fields)
                .filter((filterName) => !!fields[filterName])
                .map(filterName => filterName);

              const clearFilters = {};
              Object.entries(filters)
                .filter(([_, info]) => !!info)
                .forEach(([filterName, info]) => {
                  clearFilters[filterName] = info;
                })

              getInfo({
                callback: ({ data }) => {
                  setResults(data);
                },
                fields: checkedFields,
                filters: clearFilters,
                resource: 'books',
                url: URL
              });
            }}
          >
            Select and filter
          </button>
        </div>
      </div>

      <div className="app__results">
        <ReactJson src={results} />
      </div>
    </div>
  );
}

export default App;
