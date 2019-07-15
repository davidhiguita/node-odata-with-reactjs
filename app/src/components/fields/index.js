// @vendors
import React, { useState } from 'react';

// @odata helper
import { getInfoByFields } from '../../odata-middleware';

// @styles
import './style.scss';

const initialFieldsState = {
  title: false
};

const fieldsList = [
  'author',
  'description',
  'genre',
  'price',
  'publish_date',
  'title',
  'id'
];

const URL = 'http://localhost:1945/books';

const Fields = ({
  setQuery,
  setResults
}) => {
  const [fields, setFields] = useState({ ...initialFieldsState });

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
        fieldsList.map((currentField, index) => (
          <div className={`field-${currentField}`}>
            <input
              key={`field-${index}`}
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
