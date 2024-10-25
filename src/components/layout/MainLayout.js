import React from 'react';
import Header from './Header';
import Footer from './Footer';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-gray-100">
        <div className="flex items-center justify-center align-middle">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
