import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const BookForm = ({ book, setBook, handleSubmit, isEditing }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  return (
    <div className="flex justify-center mt-16 min-h-screen bg-gray-50 gap-8">
      {/* Image Section */}
      <div className="flex flex-1 justify-center items-center border border-gray-300 h-full max-w-sm bg-gray-100">
        {book.coverImage ? (
          <img
            src={book.coverImage}
            alt="Book Cover"
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <p>Add the Url for the book cover image</p>
        )}
      </div>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-2 flex-col gap-6 w-full max-w-lg"
      >
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

        <Button className="w-full mt-6">
          {isEditing ? 'Update Book' : 'Add Book'}
        </Button>
      </form>
    </div>
  );
};

export default BookForm;
