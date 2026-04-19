import { Link, NavLink } from "react-router-dom";
import logo from "../assets/bookshelf-mark.svg";

function Navbar({ searchTerm, setSearchTerm, onSearch, savedCount, currentUser, onLogout }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  const userLabel = currentUser?.name?.trim() || currentUser?.email || "";
  const userInitial = userLabel ? userLabel.charAt(0).toUpperCase() : "";

  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <img src={logo} alt="BookShelf logo" className="brand-mark" />
        <div>
          <span className="brand-name">BookShelf</span>
          <span className="brand-subtitle">Smart library discovery</span>
        </div>
      </Link>

      <form className="nav-search" onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Search books, authors, or tags..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          aria-label="Search books"
        />
      </form>

      <nav className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </nav>

      <div className="nav-actions">
        <div className="saved-pill">{savedCount} saved</div>
        {currentUser ? (
          <>
            <Link to="/profile" className="nav-user-badge" aria-label="Open profile">
              <span className="nav-user-avatar">{userInitial}</span>
            </Link>
            <button type="button" className="ghost-button" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="ghost-button">
              Login
            </Link>
            <Link to="/signup" className="primary-button">
              Sign up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;
