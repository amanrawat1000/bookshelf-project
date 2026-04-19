import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const presetTags = ["Too early", "Medium difficulty", "Highly readable", "Advanced"];

function DashboardRecommendationCard({
  book,
  isSaved,
  currentUser,
  existingRating,
  onToggleSave,
  onRateBook
}) {
  const [selectedRating, setSelectedRating] = useState(existingRating?.rating || 0);
  const [selectedTag, setSelectedTag] = useState(
    existingRating?.readabilityTag || book.readability || "Highly readable"
  );
  const [customSuggestion, setCustomSuggestion] = useState(
    existingRating?.customSuggestion || ""
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    setSelectedRating(existingRating?.rating || 0);
    setSelectedTag(existingRating?.readabilityTag || book.readability || "Highly readable");
    setCustomSuggestion(existingRating?.customSuggestion || "");
  }, [existingRating, book]);

  const handleSave = async () => {
    try {
      await onToggleSave(book.id);
    } catch (error) {
      window.alert(error.message || "Could not save book");
    }
  };

  const handleSubmit = async () => {
    try {
      await onRateBook({
        bookId: book.id,
        rating: selectedRating,
        readabilityTag: selectedTag,
        customSuggestion
      });
      setMessage("Suggestion saved for all dashboard users.");
    } catch (error) {
      setMessage(error.message || "Could not save suggestion.");
    }
  };

  return (
    <article className="dashboard-recommendation-card">
      <div className="dashboard-recommendation-top">
        <img
          src={book.cover}
          alt={`${book.title} cover`}
          className="dashboard-recommendation-cover"
        />
        <div className="dashboard-recommendation-copy">
          <div className="book-meta-line">
            <span>{book.category}</span>
            <span>{existingRating?.rating || book.rating} rating</span>
          </div>
          <Link to={`/books/${book.id}`} className="book-title-link">
            <h3>{book.title}</h3>
          </Link>
          <p className="book-author">{book.author}</p>
          <div className="tag-row">
            {book.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="tag-pill">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="dashboard-review-panel">
        <p className="dashboard-review-title">
          {currentUser ? "Add your rating and suggestion" : "Log in to rate and suggest"}
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
          {presetTags.map((item) => (
            <button
              key={item}
              type="button"
              className={selectedTag === item ? "filter-chip active" : "filter-chip"}
              onClick={() => setSelectedTag(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <input
          type="text"
          value={customSuggestion}
          onChange={(event) => setCustomSuggestion(event.target.value)}
          placeholder="Add your own suggestion, like easier after semester 2"
          className="dashboard-suggestion-input"
        />

        <div className="dashboard-review-actions">
          <button
            type="button"
            className="primary-button"
            onClick={handleSubmit}
            disabled={!currentUser || !selectedRating}
          >
            Save suggestion
          </button>
          <button
            type="button"
            className={isSaved ? "primary-button" : "ghost-button"}
            onClick={handleSave}
          >
            {isSaved ? "Saved" : "Save book"}
          </button>
        </div>

        {message && <p className="rating-message">{message}</p>}
      </div>
    </article>
  );
}

export default DashboardRecommendationCard;
