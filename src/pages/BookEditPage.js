import React from 'react';
import { useParams } from 'react-router-dom';

const BookEditPage = () => {
  const { id } = useParams();
  return <div>BookEditPage</div>;
};

export default BookEditPage;
