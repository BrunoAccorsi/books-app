import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookForm from '@/components/Form/BookForm';
import axios from 'axios';
import MainLayout from '@/components/layout/MainLayout';

const BookEditPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true); // Patricia - state to control button "edit"

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

    
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  //handle submit needs to be implemented
  //const handleSubmit = async (e) => {}; Patricia
  const handleSubmit = async (e) => { //Patricia (implementation of update)
    e.preventDefault();
    setError(null);  
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('Unauthorized: Please log in as an administrator.');
        return;
      }
  
      //calling of backend through axios.put ...
      const response = await axios.put(`/books/${id}`, book, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        alert('Book successfully updated!');
        setDisabled(true); // Desabilita os campos após o envio
      } else {
        setError('Failed to update the book. Please try again.');
      }
    } catch (err) {
      setError(`Error while updating the book: ${err.message}`);
    }
  };
  

  return ( // comented by patricia
    // <MainLayout>
    //   <BookForm book={book} setBook={setBook} handleSubmit={handleSubmit} />;
    //   book={book} 
    //     setBook={setBook}
    //     handleSubmit={handleSubmit}
    // </MainLayout>
    <MainLayout>
      <BookForm
        book={book}
        setBook={setBook}
        handleSubmit={handleSubmit}
        isEditing={true}
        disabled={disabled} 
        setDisabled={setDisabled}
      /> 
    </MainLayout>
  );
};

export default BookEditPage;
