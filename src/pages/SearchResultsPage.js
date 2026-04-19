import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import BookGrid from "../components/BookGrid";
import FilterSidebar from "../components/FilterSidebar";
import SectionHeader from "../components/SectionHeader";

function SearchResultsPage({ appContext }) {
  const { books, savedSet, toggleSave, setSearchTerm } = appContext;
  const location = useLocation();
  const [filters, setFilters] = useState({
    difficulty: "All",
    readability: "All",
    category: "All",
    sort: "Recommended"
  });

  const searchQuery = new URLSearchParams(location.search).get("q") || "";

  useEffect(() => {
    setSearchTerm(searchQuery);
  }, [searchQuery, setSearchTerm]);

  const categories = useMemo(
    () => ["All", ...new Set(books.map((book) => book.category))],
    [books]
  );

  const filteredBooks = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    const matchesQuery = (book) => {
      if (!normalizedQuery) {
        return true;
      }

      return (
        book.title.toLowerCase().includes(normalizedQuery) ||
        book.author.toLowerCase().includes(normalizedQuery) ||
        book.category.toLowerCase().includes(normalizedQuery) ||
        book.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery))
      );
    };

    const result = books.filter((book) => {
      const difficultyMatch =
        filters.difficulty === "All" || book.difficulty === filters.difficulty;
      const readabilityMatch =
        filters.readability === "All" || book.readability === filters.readability;
      const categoryMatch =
        filters.category === "All" || book.category === filters.category;

      return matchesQuery(book) && difficultyMatch && readabilityMatch && categoryMatch;
    });

    return result.sort((first, second) => {
      if (filters.sort === "Highest Rated") {
        return second.rating - first.rating;
      }

      if (filters.sort === "Most Popular") {
        return second.students - first.students;
      }

      return second.rating + second.students / 1000 - (first.rating + first.students / 1000);
    });
  }, [books, filters, searchQuery]);

  return (
    <div className="page-stack">
      <section className="results-layout">
        <FilterSidebar
          filters={filters}
          setFilters={setFilters}
          categories={categories}
        />

        <div className="results-content">
          <SectionHeader
            eyebrow="Search results"
            title={searchQuery ? `Results for "${searchQuery}"` : "Explore the library"}
            description={`${filteredBooks.length} books matched your current search and filters.`}
            action={
              <div className="sort-wrapper">
                <label htmlFor="sortBooks">Sort by</label>
                <select
                  id="sortBooks"
                  value={filters.sort}
                  onChange={(event) =>
                    setFilters((current) => ({ ...current, sort: event.target.value }))
                  }
                >
                  <option>Recommended</option>
                  <option>Highest Rated</option>
                  <option>Most Popular</option>
                </select>
              </div>
            }
          />

          {filteredBooks.length > 0 ? (
            <BookGrid books={filteredBooks} savedSet={savedSet} onToggleSave={toggleSave} />
          ) : (
            <div className="empty-state">
              <h3>No books matched these filters</h3>
              <p>Try a broader keyword or reset a few tag filters to see more results.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default SearchResultsPage;
