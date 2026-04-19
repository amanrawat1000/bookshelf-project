import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { books as initialBooks } from "./data/books";
import BookDetailsPage from "./pages/BookDetailsPage";
import DashboardPage from "./pages/DashboardPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import SearchResultsPage from "./pages/SearchResultsPage";
import SignupPage from "./pages/SignupPage";

const API_BASE_URL = "http://localhost:5000";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentUser, setCurrentUser] = useState(() => {
    const stored = window.localStorage.getItem("bookshelf-current-user");
    return stored ? JSON.parse(stored) : null;
  });
  const [savedBooks, setSavedBooks] = useState(() => {
    const stored = window.localStorage.getItem("bookshelf-saved");
    return stored ? JSON.parse(stored) : [];
  });
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    const stored = window.localStorage.getItem("bookshelf-recent");
    return stored ? JSON.parse(stored) : [];
  });
  const [userRatings, setUserRatings] = useState(() => {
    const stored = window.localStorage.getItem("bookshelf-user-ratings");
    return stored ? JSON.parse(stored) : [];
  });
  const [communityFeedback, setCommunityFeedback] = useState({});

  useEffect(() => {
    if (currentUser) {
      window.localStorage.setItem("bookshelf-current-user", JSON.stringify(currentUser));
    } else {
      window.localStorage.removeItem("bookshelf-current-user");
    }
  }, [currentUser]);

  useEffect(() => {
    window.localStorage.setItem("bookshelf-saved", JSON.stringify(savedBooks));
  }, [savedBooks]);

  useEffect(() => {
    window.localStorage.setItem("bookshelf-recent", JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  useEffect(() => {
    window.localStorage.setItem("bookshelf-user-ratings", JSON.stringify(userRatings));
  }, [userRatings]);

  const savedSet = useMemo(() => new Set(savedBooks), [savedBooks]);
  const ratingsMap = useMemo(() => {
    const map = {};

    userRatings.forEach((item) => {
      map[item.bookId] = item;
    });

    return map;
  }, [userRatings]);

  const toggleSave = useCallback(async (bookId) => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    if (savedSet.has(bookId)) {
      setSavedBooks((current) => current.filter((id) => id !== bookId));
      return;
    }

    const response = await fetch(`${API_BASE_URL}/save-book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: currentUser.email,
        bookId
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Could not save book");
    }

    setSavedBooks(data.savedBooks || []);
  }, [currentUser, navigate, savedSet]);

  const fetchCommunityFeedback = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/book-feedback`);
      const data = await response.json();

      if (response.ok) {
        setCommunityFeedback(data.feedback || {});
      }
    } catch (error) {
      console.error("Could not load community feedback", error);
    }
  }, []);

  const signUpUser = useCallback(async ({ name, email, password, preferences = [] }) => {
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        password,
        preferences
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Signup failed");
    }

    navigate("/login");
    return data;
  }, [navigate]);

  const logInUser = useCallback(async ({ email, password }) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    setCurrentUser(data.user);
    setSavedBooks(data.user.savedBooks || []);
    setUserRatings(data.user.ratings || []);
    await fetchCommunityFeedback();
    navigate("/dashboard");
    return data;
  }, [fetchCommunityFeedback, navigate]);

  const rateBook = useCallback(async ({ bookId, rating, readabilityTag, customSuggestion }) => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    const response = await fetch(`${API_BASE_URL}/rate-book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: currentUser.email,
        bookId,
        rating,
        readabilityTag,
        customSuggestion
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Could not rate book");
    }

    setUserRatings(data.ratings || []);
    setCommunityFeedback(data.feedback || {});
  }, [currentUser, navigate]);

  const trackViewedBook = useCallback((bookId) => {
    setRecentlyViewed((current) => {
      const next = [bookId, ...current.filter((id) => id !== bookId)];
      return next.slice(0, 6);
    });
  }, []);

  const runSearch = useCallback((term) => {
    const normalized = term.trim();
    setSearchTerm(normalized);

    if (!normalized) {
      navigate("/search");
      return;
    }

    navigate(`/search?q=${encodeURIComponent(normalized)}`);
  }, [navigate]);

  const logOutUser = useCallback(() => {
    setCurrentUser(null);
    setSavedBooks([]);
    setUserRatings([]);
    setRecentlyViewed([]);
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    fetchCommunityFeedback();
  }, [fetchCommunityFeedback]);

  const appContext = {
    books: initialBooks,
    currentUser,
    savedBooks,
    savedSet,
    userRatings,
    ratingsMap,
    communityFeedback,
    recentlyViewed,
    searchTerm,
    setSearchTerm,
    toggleSave,
    rateBook,
    trackViewedBook,
    runSearch
  };

  const hideChrome = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="app-shell">
      {!hideChrome && (
        <Navbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={runSearch}
          savedCount={savedBooks.length}
          currentUser={currentUser}
          onLogout={logOutUser}
        />
      )}
      <main className={hideChrome ? "app-main auth-main" : "app-main"}>
        <Routes>
          <Route path="/" element={<HomePage appContext={appContext} />} />
          <Route path="/search" element={<SearchResultsPage appContext={appContext} />} />
          <Route
            path="/books/:bookId"
            element={<BookDetailsPage appContext={appContext} />}
          />
          <Route path="/dashboard" element={<DashboardPage appContext={appContext} />} />
          <Route path="/profile" element={<ProfilePage appContext={appContext} />} />
          <Route path="/login" element={<LoginPage onLogin={logInUser} />} />
          <Route path="/signup" element={<SignupPage onSignup={signUpUser} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!hideChrome && <Footer />}
    </div>
  );
}

export default App;
