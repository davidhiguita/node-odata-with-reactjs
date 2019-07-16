// @vendors
import { o } from 'odata';

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
