const difficultyOptions = ["Too early", "Medium", "Advanced"];
const readabilityOptions = ["Highly readable", "Guided", "Structured", "Deep dive", "Reference-heavy"];

function FilterSidebar({ filters, setFilters, categories }) {
  const updateFilter = (key, value) => {
    setFilters((current) => ({
      ...current,
      [key]: current[key] === value ? "All" : value
    }));
  };

  return (
    <aside className="filters-panel">
      <div className="filters-header">
        <h3>Refine results</h3>
        <button
          type="button"
          className="text-button"
          onClick={() =>
            setFilters({
              difficulty: "All",
              readability: "All",
              category: "All",
              sort: "Recommended"
            })
          }
        >
          Reset
        </button>
      </div>

      <div className="filter-group">
        <p>Difficulty</p>
        {difficultyOptions.map((item) => (
          <button
            key={item}
            type="button"
            className={filters.difficulty === item ? "filter-chip active" : "filter-chip"}
            onClick={() => updateFilter("difficulty", item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="filter-group">
        <p>Readability</p>
        {readabilityOptions.map((item) => (
          <button
            key={item}
            type="button"
            className={filters.readability === item ? "filter-chip active" : "filter-chip"}
            onClick={() => updateFilter("readability", item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="filter-group">
        <p>Category</p>
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            className={filters.category === item ? "filter-chip active" : "filter-chip"}
            onClick={() => updateFilter("category", item)}
          >
            {item}
          </button>
        ))}
      </div>
    </aside>
  );
}

export default FilterSidebar;
