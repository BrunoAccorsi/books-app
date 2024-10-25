import { Button } from '@/components/ui/button';
import { AuthContext } from '@/Context/AuthContext';
import { LogIn, LogOut } from 'lucide-react';
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigator = useNavigate();

  const handleAuth = () => {
    if (isAuthenticated) {
      logout();
    } else {
      navigator('/login');
    }
  };

  return (
    <header className="bg-slate-300 p-4 text-gray-800 text-center flex items-center">
      <Link to="/">
        <img src="/logo.png" alt="Book store" className="h-16" />
      </Link>
      <Button
        className="ml-auto rounded-full border-gray-500 bg-slate-200"
        variant="outline"
        onClick={handleAuth}
      >
        {isAuthenticated ? (
          <LogOut className="w-6 h-6" />
        ) : (
          <LogIn className="w-6 h-6" />
        )}
        {isAuthenticated ? 'Logout' : 'Login'}
      </Button>
    </header>
  );
};

export default Header;
