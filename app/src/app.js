// @vendors
import React, { useState } from 'react';
import ReactJson from 'react-json-view'

//@components
import Filters from './components/filters';
import Fields from './components/fields';
import NewBook from './components/new_book';

// @utils
import { getInfo, saveResource } from './odata-middleware';

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

const newBookFieldsState = {
  author: '',
  description: '',
  genre: '',
  price: '',
  publish_date: '',
  title: ''
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
  const [bookFields, setBookFields] = useState({ ...newBookFieldsState });
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");

  const getClearInfo = () => {
    const checkedFields = Object.keys(fields)
      .filter((filterName) => !!fields[filterName])
      .map(filterName => filterName);

    const clearFilters = {};
    Object.entries(filters)
      .filter(([_, info]) => !!info)
      .forEach(([filterName, info]) => {
        clearFilters[filterName] = info;
      })

    return {
      checkedFields,
      clearFilters
    };
  };

  const saveNewBook = (book) => {
    const { checkedFields, clearFilters } = getClearInfo();
    saveResource({
      callback: ({ data, error }) => {
        if (data) {
          setResults(results.push(book));
        }
        console.error('saving book ... ', { data, error });
      },
      data: bookFields,
      fields: checkedFields,
      filters: clearFilters,
      resource: 'books',
      url: URL
    });
  };

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
      <NewBook
        booksFields={booksFields}
        fields={bookFields}
        setBookFields={setBookFields}
        saveNewBook={saveNewBook}
      />

      <div className="app__mixed-buttons">
        <div className="select-and-filter-button">
          <button
            onClick={() => {
              const { checkedFields, clearFilters } = getClearInfo();

              getInfo({
                callback: ({ data, error }) => {
                  if (data) {
                    setResults(data);
                  } else {
                    console.log('getting books ... ', error);
                  }
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
