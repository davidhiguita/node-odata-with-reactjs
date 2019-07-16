// @vendors
import { o } from 'odata';

// @utils
import {
  generateFiltersUrl,
  generateSelectedFieldsUrl
} from './utils';

// MANUALLY URLs
export const getInfoByFieldsMANUAL = ({
  callback,
  fields,
  url
}) => {
  const fullUrl = generateSelectedFieldsUrl({ fields, url });

  fetch(fullUrl)
    .then(data => data.json())
    .then((data) => {
      callback(fullUrl, data);
    })
};

export const filterByFieldsMANUAL = ({
  callback,
  fields,
  url
}) => {
  const fullUrl = generateFiltersUrl({ fields, url });

  console.log('fullUrl  ', fullUrl);
  fetch(fullUrl)
    .then(data => data.json())
    .then((data) => {
      callback(fullUrl, data);
    })
};

// WITH ODATA

const fieldsToSelectString = fields => fields.join(', ');

const filstersToFilterString = (filters) => {
  let filtersString = '';
  Object.entries(filters)
    .forEach(([filterName, filterValue], index) => {
      if (index + 1 < Object.keys(filters).length) {
        filtersString += `${filterName} eq '${filterValue}' and `
      } else {
        filtersString += `${filterName} eq '${filterValue}'`
      }
    });
  console.log('filtersString  ', filtersString);
  return filtersString;
};

export const getInfo = async ({
  callback,
  fields,
  filters,
  resource,
  url
}) => {
  const fieldsString = fieldsToSelectString(fields);
  const filterString = filstersToFilterString(filters);
  const data = await o(url)
    .get(resource)
    .query({
      $filter: filterString,
      $select: fieldsString
    });
  callback({ data });
};
