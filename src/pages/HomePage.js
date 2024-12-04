// HomePage.js
import MainLayout from '@/components/layout/MainLayout';
import { Separator } from '@/components/ui/separator';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/Context/AuthContext';


const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/books');
      setBooks(response.data);
      setFilteredBooks(response.data);
    };
    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    const results = books.filter(
      (book) =>
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase()) ||
        book.id.toString().includes(search)
    );
    setFilteredBooks(results);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const goToBookPage = (id) => {
    if (isAuthenticated) {
      navigate(`/book-edit/${id}`);
      return;
    }
    navigate(`/books/${id}`);
  };

  const goToNewBookPage = () => {
    navigate('/book-new/');
  };

  return (
    <MainLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Books searching</h1>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Search for Book by Name, Author or ID"
            className="border p-2 w-full"
            value={search}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
          />
          <button
            className="bg-gray-600 text-white px-4 py-2 rounded"
            onClick={handleSearch}
          >
            Search
          </button>
          {isAuthenticated && (
            <button
              className="bg-gray-600 text-white px-4 py-2 rounded"
              onClick={goToNewBookPage}
            >
              New Book
            </button>
          )}
        </div>

        <p className="text-gray-600 mb-4">
          {filteredBooks.length} results found
        </p>

        <div className="grid gap-4">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              onClick={() => goToBookPage(book.id)}
              className="cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-16 h-20 bg-gray-200 border"
                />
                <div>
                  <h2 className="font-semibold">{book.title}</h2>
                  <p className="text-gray-600">{book.author}</p>
                </div>
              </div>
              <Separator className="my-2" />
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage;
