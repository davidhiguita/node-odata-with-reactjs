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
  try {
    const fieldsString = fieldsToSelectString(fields);
    const filterString = filstersToFilterString(filters);
    const data = await o(url)
      .get(resource)
      .query({
        $filter: filterString,
        $select: fieldsString
      });
    callback({ data });
  } catch(error) {
    callback({ error });
  }
};

export const saveResource = async ({
  callback,
  data,
  fields,
  filters,
  resource,
  url
}) => {
  try {
    console.log('saving');
    console.log(fields);
    console.log(filters);
    const fieldsString = fieldsToSelectString(fields);
    const filterString = filstersToFilterString(filters);
    console.log('fieldsString  ', fieldsString);
    console.log('filterString  ', filterString);
    const response = await o(url)
      .post(resource, data)
      .query();
      // .query({
      //   $filter: filterString,
      //   $select: fieldsString
      // });
    
    callback({ data: response });
  } catch (error) {
    callback({ error });
  }
};
