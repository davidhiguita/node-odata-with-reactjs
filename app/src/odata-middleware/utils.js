export const generateSelectedFieldsUrl = ({ fields, url }) => {
  let fullUrl = url;

  if (fields.length) {
    fullUrl = `${url}?$select=`;
    fields
      .forEach((key, index) => {
        fullUrl += `${key}${index + 1 < fields.length ? ',' : ''}`;
      });
  }

  return fullUrl;
}

export const generateFiltersUrl = ({ fields, url }) => {
  const keys = Object.keys(fields);
  let fullUrl = url;

  if (keys.length) {
    fullUrl = `${url}?$filter=`;

    keys
      .forEach((key, index) => {
        fullUrl += `${key} eq '${fields[key]}' ${index + 1 < keys.length ? 'and' : ''}`;
      });
  }

  return fullUrl;
};