import BookCard from "./BookCard";

function BookGrid({ books, savedSet, onToggleSave }) {
  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          isSaved={savedSet.has(book.id)}
          onToggleSave={onToggleSave}
        />
      ))}
    </div>
  );
}

export default BookGrid;
