// @vendors
import React, { useState } from 'react';
import ReactJson from 'react-json-view'

//@components
import Filters from './components/filters';
import Fields from './components/fields';

// @styles
import './style.scss';

const App = () => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");

  return (
    <div className="app">
      <div className="app__query">
        {query}
      </div>
      <Filters setQuery={setQuery} setResults={setResults} />
      <Fields setQuery={setQuery} setResults={setResults} />

      <div className="app__results">
        <ReactJson src={results} />
      </div>

    </div>
  );
}

export default App;
