import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookForm from '@/components/Form/BookForm';
import axios from 'axios';
import MainLayout from '@/components/layout/MainLayout';

const BookEditPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true); // Patricia - state to control button "edit"
  const navigate = useNavigate(); // For redirecting after deletion

  useEffect(() => {
    const fetchBookDetails = async () => {
      if (id) {
        try {
          const response = await axios.get(`/books/${id}`);
          setBook(response.data);
        } catch (err) {
          setError('Error fetching book details.');
        } finally {
          setLoading(false);
        }
      }
    };
    fetchBookDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('Unauthorized: Please log in as an administrator.');
        return;
      }

      const response = await axios.put(`/books/${id}`, book, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        alert('Book successfully updated!');
        setDisabled(true);
      } else {
        setError('Failed to update the book. Please try again.');
      }
    } catch (err) {
      setError(`Error while updating the book: ${err.message}`);
    }
  };

  // Delete function
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;

    setError(null); // Reset any previous errors

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('Unauthorized: Please log in as an administrator.');
        return;
      }

      const response = await axios.delete(`/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 204) {
        alert('Book successfully deleted!');
        navigate('/'); // Redirect to homepage after deletion
      } else {
        setError('Failed to delete the book. Please try again.');
      }
    } catch (err) {
      setError(`Error while deleting the book: ${err.message}`);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <MainLayout>
      <BookForm
        book={book}
        setBook={setBook}
        handleSubmit={handleSubmit}
        isEditing={true}
        disabled={disabled}
        setDisabled={setDisabled}
        onDelete={handleDelete} // Pass handleDelete function to BookForm
      />
    </MainLayout>
  );
};

export default BookEditPage;
