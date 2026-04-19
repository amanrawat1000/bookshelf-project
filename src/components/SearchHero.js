function SearchHero({ searchTerm, setSearchTerm, onSearch }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <section className="hero">
      <div className="hero-badge">AI-inspired university library platform</div>
      <div className="hero-title-stack">
        <h1>bookshelf</h1>
      </div>

      <div className="hero-metrics">
        <div>
          <strong>12K+</strong>
          <span>Student reviews mapped to tags</span>
        </div>
        <div>
          <strong>320+</strong>
          <span>Smart recommendations each week</span>
        </div>
        <div>
          <strong>94%</strong>
          <span>Reported improvement in book selection</span>
        </div>
      </div>

      <form className="hero-search" onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Search by title, author, category, or tag"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          aria-label="Search the library"
        />
        <button type="submit" className="primary-button">
          Explore Library
        </button>
      </form>
    </section>
  );
}

export default SearchHero;
