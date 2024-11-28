import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const BookNewPage = () => {
  const { id } = useParams(); 
  const [book, setBook] = useState({
    title: '',
    author: '',
    description: '',
    publicationDate: '',
    coverImage: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      const token = localStorage.getItem('authToken'); // Assumes JWT token is stored in localStorage
      console.log('Retrieved token:', token); //para testar o token
      if (!token) {
        setError('Unauthorized: Please log in as an administrator.');
        return;
      }
      const response = await axios.post(    
        '/books',   
        book,    
         {      
          headers: { 
                'Content-Type': 'application/json',
                 Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        //const responseData = await response.json();
        setSuccess(true);
        setBook({
          title: '',
          author: '',
          description: '',
          publicationDate: '',
          coverImage: '',
        }); // Reset form after success
        } else if (response.status === 401) {
        const errorData = await response.json();
        setError(`Unauthorized: ${errorData.message}`);
        } else {
        const errorData = await response.json();
        setError(`Error: ${errorData.message}`);
        }
        } catch (err) {
        setError(`Failed to connect to the server: ${err.message}`);
        }
        };
           

  return (
    <MainLayout>
    <div>
      <h1 className="text-2xl font-bold mb-4" style={{textAlign: 'center'}}>Add New Book</h1>
      {id && <p>ID: {id}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Book successfully added!</p>}
      <form onSubmit={handleSubmit} style={{ width: '50%', margin: '0 auto' }}>
        <div>
          <Label htmlFor="title">Title:</Label>
          <Input
            type="text"
            id="title"
            name="title"
            value={book.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="author">Author:</Label>
          <Input
            type="text"
            id="author"
            name="author"
            value={book.author}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="description">Description:</Label>
          <Input
            id="description"
            name="description"
            value={book.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="publicationDate">Publication Date:</Label>
          <Input
             type="date"
             id="publicationDate"
             name="publicationDate"
             value={book.publicationDate}
             onChange={handleChange}
             required
          />
        </div>
        <div>
          <Label htmlFor="coverImage">Cover Image URL:</Label>
          <Input
            type="url"
            id="coverImage"
            name="coverImage"
            value={book.coverImage}
            onChange={handleChange}
            required
          />
        </div>
       
        <Button className="w-full">Submit</Button>
      </form>
    </div>
    </MainLayout>
  );
};



export default BookNewPage;
