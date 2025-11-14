import { consoleError } from './error.js';

const get = (id) => document.getElementById(`${id}`);
const query = (query) => document.querySelector(`.${query}`);
const queryAll = (query) => document.querySelectorAll(`.${query}`);

const fetchData = async (route, method, body, opts = {}) => {
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
          body: JSON.stringify({ ...body }),
          ...opts,
        });
        return await response.json();
      }
    }
  } catch (err) {
    consoleError('fetchData function', err);
  }
};

const formatName = (name, direction = 1) => {
  const capitalise = (word) => {
    const firstChar = word[0];
    return firstChar.toUpperCase() + word.slice(1);
  };
  return direction === 1
    ? name.replace(/\s+/g, '_').toLowerCase()
    : name
        ?.split('_')
        .map((part) => capitalise(part))
        .join(' ');
};

export { get, query, queryAll, fetchData, formatName };
