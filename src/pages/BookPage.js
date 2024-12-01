import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import BookForm from '@/components/Form/BookForm';

const BookPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  const handleSubmit = async (e) => {};

  return (
    <MainLayout>
      <BookForm book={book} setBook={setBook} handleSubmit={handleSubmit} />;
    </MainLayout>
  );
};

export default BookPage;
