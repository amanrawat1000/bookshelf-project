import { Link } from "react-router-dom";

function CommunityFeedbackCard({ book, communityEntry }) {
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
            <span>{communityEntry?.averageRating || book.rating} rating</span>
          </div>
          <Link to={`/books/${book.id}`} className="book-title-link">
            <h3>{book.title}</h3>
          </Link>
          <p className="book-author">{book.author}</p>
        </div>
      </div>

      <div className="dashboard-community-panel">
        <div className="community-stat">
          <strong>{communityEntry?.averageRating || "New"}</strong>
          <span>
            {communityEntry?.totalRatings
              ? `${communityEntry.totalRatings} student ratings`
              : "No ratings yet"}
          </span>
        </div>

        <div className="tag-row">
          {(communityEntry?.topTags || []).length > 0 ? (
            communityEntry.topTags.map((item) => (
              <span key={item.tag} className="tag-pill">
                {item.tag} ({item.count})
              </span>
            ))
          ) : (
            <span className="tag-pill">No community tags yet</span>
          )}
        </div>

        <div className="community-suggestion-list">
          {(communityEntry?.customSuggestions || []).length > 0 ? (
            communityEntry.customSuggestions.map((item, index) => (
              <div key={`${item.email}-${index}`} className="community-suggestion-item">
                <strong>{item.email}</strong>
                <span>"{item.text}"</span>
              </div>
            ))
          ) : (
            <div className="community-suggestion-item muted">No custom suggestions yet.</div>
          )}
        </div>
      </div>
    </article>
  );
}

export default CommunityFeedbackCard;
