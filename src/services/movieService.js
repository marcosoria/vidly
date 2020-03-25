import http from "./httpService";
const moviesEndPoint = '/movies';

function movieUrl(movieId){
  return `${moviesEndPoint}/${movieId}`;
}

export function getMovies() {
  return http.get(moviesEndPoint);;
}

export function getMovie(id) {
  return http.get(movieUrl(id));
}

export function saveMovie(movie) {
  if(movie._id){
    const body = { ...movie };
    delete body._id;
    return http.put(movieUrl(movie._id), body)
  }
  return http.post(moviesEndPoint, movie);
}

export function deleteMovie(id) {
  return http.delete(movieUrl(id));
}