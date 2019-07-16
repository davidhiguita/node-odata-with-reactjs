// @vendors
import React from 'react';

// @styles
import './style.scss';

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
    </div>
  );
}

export default Fields;
