import { consoleError } from './error.js';

const get = (id) => document.getElementById(`${id}`);
const query = (query) => document.querySelector(`.${query}`);
const queryAll = (query) => document.querySelectorAll(`.${query}`);

const fetchData = async (route, method, body) => {
  const baseURI = 'http://localhost:3000';
  try {
    switch (method) {
      case 'GET': {
        const response = await fetch(`${baseURI}${route}?${body}`, { method });
        return await response.json();
      }
      default: {
        const response = await fetch(`${baseURI}${route}`, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });
        return await response.json();
      }
    }
  } catch (err) {
    consoleError('fetchData function', err);
  }
};

export { get, query, queryAll, fetchData };
