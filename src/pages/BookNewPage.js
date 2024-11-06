import React from 'react';
import { useParams } from 'react-router-dom';

const BookNewPage = () => {
  const { id } = useParams();
  return <div>BookNewPage</div>;
};

export default BookNewPage;
