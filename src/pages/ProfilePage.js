import BookGrid from "../components/BookGrid";
import StatCard from "../components/StatCard";

function ProfilePage({ appContext }) {
  const { books, currentUser, savedBooks, savedSet, toggleSave } = appContext;
  const savedLibrary = books.filter((book) => savedBooks.includes(book.id));
  const displayName = currentUser?.name?.trim() || "Guest";
  const avatarText = displayName.charAt(0).toUpperCase();
  const emailText = currentUser?.email || "Sign in to see your profile details.";

  return (
    <div className="page-stack">
      <section className="profile-hero">
        <div className="profile-avatar">{avatarText}</div>
        <div>
          <span className="section-eyebrow">Profile</span>
          <h1>{displayName}</h1>
          <p>{emailText}</p>
        </div>
      </section>

      <section className="stats-grid">
        <StatCard label="Saved books" value={savedBooks.length} helper="Books on your personal shelf." />
        <StatCard label="Focus area" value="Systems" helper="Top category based on your current activity." />
        <StatCard label="Reading style" value="Readable" helper="Preference inferred from your tags." />
      </section>

      <section className="content-section">
        <div className="section-header">
          <div>
            <span className="section-eyebrow">Saved collection</span>
            <h2>Books you want to return to</h2>
            <p>A compact view of your bookmarked titles and activity.</p>
          </div>
        </div>

        {savedLibrary.length > 0 ? (
          <BookGrid books={savedLibrary} savedSet={savedSet} onToggleSave={toggleSave} />
        ) : (
          <div className="empty-state">
            <h3>No saved books yet</h3>
            <p>Your saved collection will appear here as you bookmark titles across the app.</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default ProfilePage;
