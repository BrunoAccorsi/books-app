import MainLayout from '@/components/layout/MainLayout';
import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import BookForm from '@/components/Form/BookForm';

const BookNewPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState({
    title: '',
    author: '',
    description: '',
    publicationDate: '',
    coverImage: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('Unauthorized: Please log in as an administrator.');
        return;
      }

      const response = await axios.post('/books', book, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        setSuccess(true);
        setBook({
          title: '',
          author: '',
          description: '',
          publicationDate: '',
          coverImage: '',
        });
      } else {
        const errorData = await response.json();
        setError(`Error: ${errorData.message}`);
      }
    } catch (err) {
      setError(`Failed to connect to the server: ${err.message}`);
    }
  };

  return (
    <MainLayout>
      <div>
        <h1 className="text-2xl font-bold my-4 text-center">Add New Book</h1>
        {id && <p>ID: {id}</p>}
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">Book successfully added!</p>}
        <BookForm book={book} setBook={setBook} handleSubmit={handleSubmit} />
      </div>
    </MainLayout>
  );
};

export default BookNewPage;
