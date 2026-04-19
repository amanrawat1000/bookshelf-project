import BookGrid from "../components/BookGrid";
import CommunityFeedbackCard from "../components/CommunityFeedbackCard";
import DashboardRecommendationCard from "../components/DashboardRecommendationCard";
import SectionHeader from "../components/SectionHeader";
import StatCard from "../components/StatCard";

function DashboardPage({ appContext }) {
  const {
    books,
    currentUser,
    savedBooks,
    savedSet,
    ratingsMap,
    communityFeedback,
    recentlyViewed,
    toggleSave,
    rateBook
  } = appContext;
  const savedLibrary = books.filter((book) => savedBooks.includes(book.id));
  const recentLibrary = books.filter((book) => recentlyViewed.includes(book.id));
  const recommended = books
    .filter((book) => !savedSet.has(book.id))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);
  const communityBooks = books.filter((book) => communityFeedback[book.id]);

  return (
    <div className="page-stack">
      <section className="dashboard-header">
        <div>
          <span className="section-eyebrow">Dashboard</span>
          <h1>Your reading momentum at a glance</h1>
          <p>Track saved titles, revisit recent books, and surface smarter recommendations.</p>
        </div>
      </section>

      <section className="stats-grid">
        <StatCard
          label="Books saved"
          value={savedBooks.length}
          helper="Titles bookmarked for later review."
        />
        <StatCard
          label="Recently viewed"
          value={recentlyViewed.length}
          helper="Books you opened in the current session."
        />
        <StatCard
          label="Recommendation score"
          value="87%"
          helper="Demo signal based on tags and reading patterns."
        />
      </section>

      <section className="content-section">
        <SectionHeader
          eyebrow="For you"
          title="Recommended from your activity"
          description="Rate books here and add your own suggestion. This section is only for your input."
        />
        <div className="dashboard-recommendation-grid">
          {recommended.map((book) => (
            <DashboardRecommendationCard
              key={book.id}
              book={book}
              isSaved={savedSet.has(book.id)}
              currentUser={currentUser}
              existingRating={ratingsMap[book.id]}
              onToggleSave={toggleSave}
              onRateBook={rateBook}
            />
          ))}
        </div>
      </section>

      <section className="content-section">
        <SectionHeader
          eyebrow="Community"
          title="Other students' ratings and suggestions"
          description="This section shows shared dashboard feedback from other users."
        />
        {communityBooks.length > 0 ? (
          <div className="dashboard-recommendation-grid">
            {communityBooks.map((book) => (
              <CommunityFeedbackCard
                key={book.id}
                book={book}
                communityEntry={communityFeedback[book.id]}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>No community feedback yet</h3>
            <p>Once students start rating and adding suggestions, they will appear here.</p>
          </div>
        )}
      </section>

      <section className="content-section">
        <SectionHeader
          eyebrow="Recently viewed"
          title="Continue where you left off"
          description="A quick shelf of the books you checked most recently."
        />
        {recentLibrary.length > 0 ? (
          <BookGrid books={recentLibrary} savedSet={savedSet} onToggleSave={toggleSave} />
        ) : (
          <div className="empty-state">
            <h3>No recent books yet</h3>
            <p>Open a book detail page to populate this section.</p>
          </div>
        )}
      </section>

      <section className="content-section">
        <SectionHeader
          eyebrow="Saved shelf"
          title="Your bookmarked books"
          description="Everything you have marked for follow-up, exam prep, or deeper study."
        />
        {savedLibrary.length > 0 ? (
          <BookGrid books={savedLibrary} savedSet={savedSet} onToggleSave={toggleSave} />
        ) : (
          <div className="empty-state">
            <h3>Your shelf is empty</h3>
            <p>Save a few books from the homepage or search results to build your library.</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default DashboardPage;
