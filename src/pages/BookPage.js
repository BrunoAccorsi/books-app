import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
//import BookForm from '@/components/Form/BookForm';
import '../styles/BookPage.css'; // Patricia

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
  //const handleSubmit = async (e) => {};

  return (
    // <MainLayout> comentado por Patricia para estilizar
    //   <div>
    //     <h1>{book.title}</h1>
    //     <p>Author: {book.author}</p>
    //     <p>Description: {book.description}</p>
    //     <img src={book.coverImage} alt={book.title} />
    //   </div>
    // </MainLayout>

    //Patricia - criadas classes para css BookPage.css
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
      </div>
    </MainLayout>
  );
};

export default BookPage;
