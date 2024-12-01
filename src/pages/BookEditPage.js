import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookForm from '@/components/Form/BookForm';
import axios from 'axios';

const BookEditPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBook = async () => {
      setError(''); // Clear any previous errors
      try {
        const response = await axios.get(`/books/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Add the auth token
          },
        });

        const bookData = response.data;
        setBook(bookData); // Set the book data into state
      } catch (err) {
        if (err.response) {
          setError(
            err.response.data.message || 'Unable to fetch the book details.'
          );
        } else {
          setError('An error occurred. Please try again.');
        }
      }
    };

    fetchBook();
  }, [id]);
  return <BookForm book={book} setBook={setBook} handleSubmit={() => {}} />;
};

export default BookEditPage;
