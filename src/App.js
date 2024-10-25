import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthProvider from './Context/AuthContext';
import './global.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import BookPage from './pages/BookPage';
import BookEditPage from './pages/BookEditPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/book/:id" element={<BookPage />} />
          <Route path="/book-edit/:id" element={<BookEditPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App; //
