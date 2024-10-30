import MainLayout from '@/components/layout/MainLayout';
import { Separator } from '@/components/ui/separator';
import axios from 'axios';
import { useEffect, useState } from 'react';

const HomePage = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/books');
      setBooks(response.data);
    };
    fetchData();
  }, []);
  console.log(books);
  return (
    <MainLayout>
      <div className="grid gap-4">
        {books.map((book) => (
          <>
            <div className="flex gap-4">
              <img src={book.coverImage} alt={book.title} className="w-14" />
              <h1 key={book.id}>{book.title}</h1>
            </div>
            <Separator className="my-2" />
          </>
        ))}
      </div>
    </MainLayout>
  );
};

export default HomePage;
