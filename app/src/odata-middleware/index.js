import {
  generateFiltersUrl,
  generateSelectedFieldsUrl
} from './utils';

export const getInfoByFields = ({
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

export const filterByFields = ({
  callback,
  fields,
  url
}) => {
  const fullUrl = generateFiltersUrl({ fields, url });

  console.log('fullUrl  ', fullUrl);
};
