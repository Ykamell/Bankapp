import { request } from '../utils/https-client';

export const loginUser = (data) => {
  const url = 'login';
  return request(url, 'post', data).then((response) => {
    console.log('User Logged: ', response.data);
    return response;
  })
  .catch((error) => {
    console.error('Error loginUser: ', error);
  });
};

