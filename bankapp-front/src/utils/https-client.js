import axios from 'axios';

export const request = (url, method, data) => {
  const config = {
    method,
    url: 'http://localhost:3001/' + url,
    data
  };
  return axios(config);
};