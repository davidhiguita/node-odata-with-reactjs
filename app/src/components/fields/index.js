// @vendors
import React from 'react';

// @odata helper
import { getInfoByFields } from '../../odata-middleware';

// @styles
import './style.scss';

const URL = 'http://localhost:1945/books';

const Fields = ({
  booksFields,
  fields,
  setFields,
  setQuery,
  setResults
}) => {


  const setField = (fieldName) => (e) => {
    const newFields = { ...fields };
    newFields[fieldName] = e.target.checked;
    setFields(newFields)
  };

  const getByFields = () => {
    const checkedFields = Object.keys(fields)
      .filter((filterName) => !!fields[filterName])
      .map(filterName => filterName);

    getInfoByFields({
      callback: (query, results) => {
        setQuery(query);
        setResults(results);
      },
      fields: checkedFields,
      url: URL
    });
  };

  return (
    <div className="app__fields">
      {
        booksFields.map((currentField, index) => (
          <div
            className={`field-${currentField}`}
            key={`field-${index}`}
          >
            <input
              onChange={setField(currentField)}
              placeholder={currentField}
              type="checkbox"
              value={fields[currentField]}
            />
            {currentField}
          </div>
        ))
      }

      <div className="fields-button">
        <button
          onClick={getByFields}
        >
          GetByFields
        </button>
      </div>
    </div>
  );
}

export default Fields;
