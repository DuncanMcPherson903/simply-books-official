import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAuthors = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/authors.json?orderBy="uid"&equalTo="${uid}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          resolve(Object.values(data));
        } else {
          resolve([]);
        }
      })
      .catch(reject);
  });

// FIXME: CREATE AUTHOR
const createAuthor = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/authors.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// FIXME: GET SINGLE AUTHOR
const getSingleAuthor = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/authors/${firebaseKey}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// FIXME: DELETE AUTHOR
const deleteSingleAuthor = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/authors/${firebaseKey}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// FIXME: UPDATE AUTHOR
const updateAuthor = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/authors/${payload.firebaseKey}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// TODO: GET A SINGLE AUTHOR'S BOOKS
const getAuthorBooks = (authorFirebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/books.json?orderBy="author_id"&equalTo="${authorFirebaseKey}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

const favoriteAuthors = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/authors.json?orderBy="uid"&equalTo="${uid}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const favorites = Object.values(data).filter((item) => item.favorite);
        resolve(favorites);
      })
      .catch(reject);
  });

export { getAuthors, createAuthor, getSingleAuthor, deleteSingleAuthor, updateAuthor, favoriteAuthors, getAuthorBooks };
