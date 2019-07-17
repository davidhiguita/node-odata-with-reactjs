// @vendors
import React from 'react';

// @styles
// import './style.scss';

const Fields = ({
  booksFields,
  fields,
  saveNewBook,
  setBookFields
}) => {


  const setBookField = (fieldName) => (e) => {
    const newFields = { ...fields };
    newFields[fieldName] = e.target.value;
    setBookFields(newFields)
  };

  return (
    <div className="app__new-book">
      {
        booksFields.filter(field => field !== 'id').map((filterName, index) => (
          <div
            className={`filter-${filterName}`}
            key={`filter-${filterName}`}
          >
            <input
              onChange={setBookField(filterName)}
              placeholder={filterName}
              value={booksFields[filterName]}
            />
          </div>
        ))
      }
      <button
        disabled={Object.values(fields).filter(value => !!value).length !== Object.values(fields).length}
        onClick={saveNewBook}
      >
        Add book
      </button>
    </div>
  );
}

export default Fields;
