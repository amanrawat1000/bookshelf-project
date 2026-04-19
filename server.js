const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const users = [];

function buildBookFeedback() {
  const feedbackMap = {};

  users.forEach((user) => {
    (user.ratings || []).forEach((entry) => {
      if (!feedbackMap[entry.bookId]) {
        feedbackMap[entry.bookId] = {
          averageRating: 0,
          totalRatings: 0,
          tags: {},
          customSuggestions: []
        };
      }

      const target = feedbackMap[entry.bookId];
      target.averageRating += Number(entry.rating || 0);
      target.totalRatings += 1;

      if (entry.readabilityTag) {
        target.tags[entry.readabilityTag] = (target.tags[entry.readabilityTag] || 0) + 1;
      }

      if (entry.customSuggestion && entry.customSuggestion.trim()) {
        target.customSuggestions.push({
          text: entry.customSuggestion.trim(),
          email: user.email
        });
      }
    });
  });

  Object.keys(feedbackMap).forEach((bookId) => {
    const item = feedbackMap[bookId];
    item.averageRating = Number((item.averageRating / item.totalRatings).toFixed(1));
    item.topTags = Object.entries(item.tags)
      .sort((first, second) => second[1] - first[1])
      .slice(0, 4)
      .map(([tag, count]) => ({ tag, count }));
    item.customSuggestions = item.customSuggestions.slice(-5).reverse();
  });

  return feedbackMap;
}

app.get("/", (req, res) => {
  res.json({ message: "BookShelf backend is running" });
});

app.post("/signup", (req, res) => {
  const { email, password, preferences, name } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required"
    });
  }

  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    return res.status(400).json({
      message: "User already exists"
    });
  }

  const newUser = {
    name: name || "",
    email,
    password,
    preferences: Array.isArray(preferences) ? preferences : [],
    savedBooks: [],
    ratings: []
  };

  users.push(newUser);

  res.status(201).json({
    message: "Signup successful",
    user: newUser
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required"
    });
  }

  const user = users.find(
    (item) => item.email === email && item.password === password
  );

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password"
    });
  }

  res.json({
    message: "Login successful",
    user
  });
});

app.get("/user/:email", (req, res) => {
  const email = req.params.email;
  const user = users.find((item) => item.email === email);

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  res.json(user);
});

app.get("/book-feedback", (req, res) => {
  res.json({
    feedback: buildBookFeedback()
  });
});

app.post("/save-book", (req, res) => {
  const { email, book, bookId } = req.body;
  const bookValue =
    bookId || (typeof book === "object" && book !== null ? book.id : book);

  if (!email || !bookValue) {
    return res.status(400).json({
      message: "Email and book are required"
    });
  }

  const user = users.find((item) => item.email === email);

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  const alreadySaved = user.savedBooks.includes(bookValue);

  if (alreadySaved) {
    return res.status(400).json({
      message: "Book already saved"
    });
  }

  user.savedBooks.push(bookValue);

  res.json({
    message: "Book saved successfully",
    savedBooks: user.savedBooks
  });
});

app.post("/rate-book", (req, res) => {
  const { email, bookId, rating, readabilityTag, customSuggestion } = req.body;

  if (!email || !bookId) {
    return res.status(400).json({
      message: "Email and bookId are required"
    });
  }

  const user = users.find((item) => item.email === email);

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  const numericRating = Number(rating);

  if (!numericRating || numericRating < 1 || numericRating > 5) {
    return res.status(400).json({
      message: "Rating must be between 1 and 5"
    });
  }

  const existingRating = user.ratings.find((item) => item.bookId === bookId);

  if (existingRating) {
    existingRating.rating = numericRating;
    existingRating.readabilityTag = readabilityTag || "";
    existingRating.customSuggestion = customSuggestion || "";
  } else {
    user.ratings.push({
      bookId,
      rating: numericRating,
      readabilityTag: readabilityTag || "",
      customSuggestion: customSuggestion || ""
    });
  }

  res.json({
    message: "Book rated successfully",
    ratings: user.ratings,
    feedback: buildBookFeedback()
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
