import http from './httpService';

const usersEndPoint = '/users';

export function register(user){
  return http.post(usersEndPoint, {
    email: user.username,
    password: user.password,
    name: user.name
  });
}