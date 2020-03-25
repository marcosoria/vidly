import http from './httpService';
const endPoint = '/genres';
export function getGenres() {  
  return http.get(endPoint);
}