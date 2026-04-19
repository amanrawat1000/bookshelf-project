import { Link } from "react-router-dom";

function BookCard({ book, isSaved, onToggleSave }) {
  const handleSave = async () => {
    try {
      await onToggleSave(book.id);
    } catch (error) {
      window.alert(error.message || "Could not save book");
    }
  };

  return (
    <article className="book-card">
      <div className="book-cover-shell">
        <img src={book.cover} alt={`${book.title} cover`} className="book-cover" />
        <button
          type="button"
          className={isSaved ? "bookmark-button active" : "bookmark-button"}
          onClick={handleSave}
          aria-label={isSaved ? "Remove bookmark" : "Save book"}
        >
          {isSaved ? "Saved" : "Save"}
        </button>
      </div>

      <div className="book-card-content">
        <div className="book-meta-line">
          <span>{book.category}</span>
          <span>{book.rating} rating</span>
        </div>
        <Link to={`/books/${book.id}`} className="book-title-link">
          <h3>{book.title}</h3>
        </Link>
        <p className="book-author">{book.author}</p>
        <div className="tag-row">
          {book.tags.map((tag) => (
            <span key={tag} className="tag-pill">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default BookCard;
