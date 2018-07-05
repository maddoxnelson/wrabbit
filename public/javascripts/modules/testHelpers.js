import axios from 'axios';

export function helloWorld(string) {
  return `${string} World!`;
}

export function goodbyeWorld(string) {
  return `Goodbye ${string} World!`;
}

export function makeFetchHappen() {
  return axios.get('/api/user/5b1dc48be2cb5e204b28e2de')
    .then(response => response.name);
}
