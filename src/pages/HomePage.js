import { Link } from "react-router-dom";
import BookGrid from "../components/BookGrid";
import SearchHero from "../components/SearchHero";
import SectionHeader from "../components/SectionHeader";
import TagCloud from "../components/TagCloud";
import { featuredIds } from "../data/books";

function HomePage({ appContext }) {
  const { books, savedSet, toggleSave, searchTerm, setSearchTerm, runSearch } = appContext;
  const featuredBooks = books.filter((book) => featuredIds.includes(book.id));
  const recommendedBooks = [...books]
    .sort((a, b) => b.rating - a.rating || b.students - a.students)
    .slice(0, 8);
  const tags = [
    "Too early",
    "Medium difficulty",
    "Highly readable",
    "Advanced",
    "Exam prep",
    "Project friendly",
    "User empathy",
    "Systems thinking"
  ];

  return (
    <div className="page-stack">
      <SearchHero searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={runSearch} />

      <section className="content-section">
        <SectionHeader
          eyebrow="Featured picks"
          title="Recommendation"
          description="A curated mix of approachable essentials and high-value deep dives from the most-saved shelves."
          action={
            <Link to="/search" className="ghost-button">
              Browse all
            </Link>
          }
        />
        <BookGrid books={featuredBooks} savedSet={savedSet} onToggleSave={toggleSave} />
      </section>

      <section className="content-section">
        <SectionHeader
          eyebrow="Smart recommendations"
          title="Books"
          description="Dummy recommendation logic surfaces books with strong ratings, high engagement, and useful student tags."
        />
        <BookGrid books={recommendedBooks} savedSet={savedSet} onToggleSave={toggleSave} />
      </section>

      <section className="content-section category-panel">
        <SectionHeader
          eyebrow="Experience tags"
          title="Navigate by how a book feels, not just its title"
          description="BookShelf prioritizes real student signals to help you avoid books that are either too dense or too basic for your current semester."
        />
        <TagCloud tags={tags} />
      </section>
    </div>
  );
}

export default HomePage;
