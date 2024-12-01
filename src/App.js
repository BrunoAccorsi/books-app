import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthProvider from './Context/AuthContext';
import './global.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import BookPage from './pages/BookPage';
import BookEditPage from './pages/BookEditPage';
import BookNewPage from './pages/BookNewPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/books/:id" element={<BookPage />} />
          <Route path="/book-edit/:id" element={<BookEditPage />} />
          <Route path="/book-new/" element={<BookNewPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App; //
