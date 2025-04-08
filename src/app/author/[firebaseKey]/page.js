'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { viewAuthorDetails } from '../../../api/mergedData';
import BookCard from '../../../components/BookCard';

export default function ViewAuthor({ params }) {
  const [authorDetails, setAuthorDetails] = useState({});

  // grab firebaseKey from url
  const { firebaseKey } = params;

  const getAllAuthorBooks = () => {
    viewAuthorDetails(firebaseKey).then(setAuthorDetails);
  };

  // make call to API layer to get the data
  useEffect(() => {
    viewAuthorDetails(firebaseKey).then(setAuthorDetails);
  }, [firebaseKey]);

  return (
    <div>
      <div className="mt-5 d-flex flex-wrap">
        <div className="d-flex flex-column">
          <img src={authorDetails.image} alt={' '} style={{ width: '300px' }} />
        </div>
        <div className="text-white ms-5 details">
          <h5>
            {authorDetails.first_name} {authorDetails.last_name}
          </h5>
          <p>Author Email: {authorDetails.email}</p>
          <hr />
        </div>
      </div>
      <hr />
      <h5>
        Books by {authorDetails.first_name} {authorDetails.last_name}
      </h5>
      {authorDetails?.books && (
        <div className="d-flex flex-wrap">
          {/* TODO: map over books here using BookCard component */}
          {authorDetails.books.map((book) => (
            <BookCard key={book.firebaseKey} bookObj={book} onUpdate={getAllAuthorBooks} />
          ))}
        </div>
      )}
    </div>
  );
}

ViewAuthor.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
