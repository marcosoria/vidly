import http from './httpService';
import jwtDecode from 'jwt-decode';

const endPoint = '/auth';
const tokenKey = 'token'

http.setJwt(getToken());

export async function login(email, password){
  const { data: jwt } = await http.post(endPoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt){
  localStorage.setItem(tokenKey, jwt);
}

export function logout(){
  localStorage.removeItem(tokenKey);
}

export function getToken(){
  return localStorage.getItem(tokenKey);
}

export function getCurrentUser(){
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);          
  } catch (ex) {    
    return null;  
  }
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getToken
}