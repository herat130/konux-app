import 'isomorphic-fetch';
export const fetchWrapper = (url: string, method = 'GET', data?: any) => {
  const fetchConfig : any = {
    method,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*',
      Origin: 'http://localhost:3000',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
      'Access-Control-Max-Age': 86400,
    },
    credentials: 'omit',
    cache: 'no-cache',
    mode: 'cors',
    // referrer: 'no-referrer',
    // redirect:'follow',
  };
  return fetch(url, fetchConfig)
    .then(result => {
      if (result.status === 200) {
        return result.json();
      }
      throw new Error('Issue in API call');
    })
    .catch(error => Promise.reject(error));
};
