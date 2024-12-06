import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import '../styles/BookPage.css';
import { AuthContext } from '@/Context/AuthContext';
import { Button } from '@/components/ui/button';

const BookPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

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

  return (
    <MainLayout>
      <div className="book-page-container">
        <h1>{book.title}</h1>
        <h2>Author: {book.author}</h2>
        <div className="description">
          <h2>Description: {book.description}</h2>
        </div>
        <img src={book.coverImage} alt={book.title} />
        <div className="additional-info">
          <p>Publication Date: {book.publicationDate}</p>
        </div>
        {isAuthenticated && (
          <Button
            className="w-[290px]"
            onClick={() => navigate(`/book-edit/${id}`)}
          >
            Edit Book
          </Button>
        )}
      </div>
    </MainLayout>
  );
};

export default BookPage;
