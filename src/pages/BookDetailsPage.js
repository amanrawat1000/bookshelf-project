import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BookGrid from "../components/BookGrid";

const readabilityOptions = ["Highly readable", "Medium difficulty", "Advanced", "Too early"];

function BookDetailsPage({ appContext }) {
  const { bookId } = useParams();
  const { books, currentUser, savedSet, ratingsMap, toggleSave, rateBook, trackViewedBook } =
    appContext;
  const book = books.find((entry) => entry.id === bookId);
  const existingRating = ratingsMap[bookId];
  const [selectedRating, setSelectedRating] = useState(existingRating?.rating || 0);
  const [selectedReadability, setSelectedReadability] = useState(
    existingRating?.readabilityTag || book?.readability || "Highly readable"
  );
  const [ratingMessage, setRatingMessage] = useState("");

  useEffect(() => {
    if (book) {
      trackViewedBook(book.id);
    }
  }, [book, trackViewedBook]);

  useEffect(() => {
    setSelectedRating(existingRating?.rating || 0);
    setSelectedReadability(existingRating?.readabilityTag || book?.readability || "Highly readable");
  }, [existingRating, book]);

  if (!book) {
    return (
      <div className="page-stack">
        <div className="empty-state">
          <h3>Book not found</h3>
          <p>The title you selected is not available in this demo library.</p>
          <Link to="/search" className="primary-button">
            Back to search
          </Link>
        </div>
      </div>
    );
  }

  const relatedBooks = books
    .filter(
      (entry) =>
        entry.id !== book.id &&
        (entry.category === book.category ||
          entry.tags.some((tag) => book.tags.includes(tag)))
    )
    .slice(0, 3);

  const handleSave = async () => {
    try {
      await toggleSave(book.id);
    } catch (error) {
      window.alert(error.message || "Could not save book");
    }
  };

  const handleRate = async () => {
    try {
      await rateBook({
        bookId: book.id,
        rating: selectedRating,
        readabilityTag: selectedReadability
      });
      setRatingMessage("Your rating was saved.");
    } catch (error) {
      setRatingMessage(error.message || "Could not save rating.");
    }
  };

  return (
    <div className="page-stack">
      <section className="details-hero">
        <div className="details-cover-card">
          <img src={book.cover} alt={`${book.title} cover`} className="details-cover" />
        </div>

        <div className="details-content">
          <span className="section-eyebrow">{book.category}</span>
          <h1>{book.title}</h1>
          <p className="details-author">{book.author}</p>
          <p className="details-description">{book.description}</p>

          <div className="details-meta">
            <div>
              <strong>{book.rating}</strong>
              <span>student rating</span>
            </div>
            <div>
              <strong>{book.pages}</strong>
              <span>pages</span>
            </div>
            <div>
              <strong>{book.students}</strong>
              <span>students engaged</span>
            </div>
          </div>

          <div className="tag-row">
            {book.tags.map((tag) => (
              <span key={tag} className="tag-pill">
                {tag}
              </span>
            ))}
          </div>

          <div className="details-actions">
            <button
              type="button"
              className={savedSet.has(book.id) ? "primary-button" : "ghost-button"}
              onClick={handleSave}
            >
              {savedSet.has(book.id) ? "Saved to shelf" : "Save to shelf"}
            </button>
            <Link to="/dashboard" className="text-button">
              View dashboard insights
            </Link>
          </div>
        </div>
      </section>

      <section className="details-grid">
        <div className="details-panel">
          <h2>Student feedback</h2>
          <ul className="feedback-list">
            {book.feedback.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="details-panel">
          <h2>Recommendation notes</h2>
          <p>
            This title is recommended because it aligns with <strong>{book.readability}</strong>{" "}
            reading preferences and has strong engagement among students exploring{" "}
            <strong>{book.category}</strong>.
          </p>
          <p>
            BookShelf uses dummy tag logic in this demo to surface similar titles by category,
            difficulty, and student feedback patterns.
          </p>
        </div>
      </section>

      <section className="details-panel">
        <h2>Rate this book</h2>
        <p>
          {currentUser
            ? "Give it a rating and add a readability tag for your profile."
            : "Log in first, then you can save and rate this book."}
        </p>

        <div className="rating-actions">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              className={selectedRating === value ? "filter-chip active" : "filter-chip"}
              onClick={() => setSelectedRating(value)}
            >
              {value} Star
            </button>
          ))}
        </div>

        <div className="rating-actions">
          {readabilityOptions.map((option) => (
            <button
              key={option}
              type="button"
              className={
                selectedReadability === option ? "filter-chip active" : "filter-chip"
              }
              onClick={() => setSelectedReadability(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="primary-button"
          onClick={handleRate}
          disabled={!currentUser || !selectedRating}
        >
          Save rating
        </button>

        {ratingMessage && <p className="rating-message">{ratingMessage}</p>}
      </section>

      <section className="content-section">
        <div className="section-header">
          <div>
            <span className="section-eyebrow">Related books</span>
            <h2>Recommended next reads</h2>
          </div>
        </div>
        <BookGrid books={relatedBooks} savedSet={savedSet} onToggleSave={toggleSave} />
      </section>
    </div>
  );
}

export default BookDetailsPage;
