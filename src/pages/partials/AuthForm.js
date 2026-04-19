import { useState } from "react";
import { Link } from "react-router-dom";

function AuthForm({ mode, title, subtitle, submitLabel, onSubmitAuth }) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState("");
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const nextErrors = {};

    if (mode === "signup" && !values.name.trim()) {
      nextErrors.name = "Please enter your full name.";
    }

    if (!values.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!values.password.trim()) {
      nextErrors.password = "Password is required.";
    } else if (values.password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatusMessage("");
      return;
    }

    setIsLoading(true);
    setServerError("");
    setStatusMessage("");

    try {
      await onSubmitAuth({
        name: values.name,
        email: values.email,
        password: values.password,
        preferences: []
      });

      setStatusMessage(
        mode === "signup"
          ? "Account created successfully. Please log in."
          : "Login successful. Redirecting..."
      );

      if (mode === "signup") {
        setValues({
          name: "",
          email: "",
          password: ""
        });
      }
    } catch (error) {
      setServerError(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  };

  return (
    <section className="auth-layout">
      <div className="auth-panel auth-copy">
        <span className="section-eyebrow">BookShelf Access</span>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <div className="auth-feature-list">
          <div>
            <strong>Save smarter</strong>
            <span>Bookmark books and return to them later from your dashboard.</span>
          </div>
          <div>
            <strong>Use peer signals</strong>
            <span>Search through readability and difficulty tags from students.</span>
          </div>
          <div>
            <strong>Stay organized</strong>
            <span>Keep your reading activity, tags, and recommendations in one place.</span>
          </div>
        </div>
      </div>

      <div className="auth-panel auth-form-panel">
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <h2>{submitLabel}</h2>

          {mode === "signup" && (
            <label>
              Full name
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={values.name}
                onChange={handleChange}
                className={errors.name ? "input-error" : ""}
              />
              {errors.name && <span className="field-error">{errors.name}</span>}
            </label>
          )}

          <label>
            Email
            <input
              type="email"
              name="email"
              placeholder="Enter your university email"
              value={values.email}
              onChange={handleChange}
              className={errors.email || serverError ? "input-error" : ""}
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange}
              className={errors.password || serverError ? "input-error" : ""}
            />
            {errors.password && <span className="field-error">{errors.password}</span>}
          </label>

          <button type="submit" className="primary-button auth-submit" disabled={isLoading}>
            {isLoading ? "Please wait..." : submitLabel}
          </button>

          {serverError && <div className="error-banner">{serverError}</div>}

          {statusMessage && (
            <div className="success-banner">
              {statusMessage}
            </div>
          )}

          <p className="auth-switch">
            {mode === "login" ? "Need an account?" : "Already have an account?"}{" "}
            <Link to={mode === "login" ? "/signup" : "/login"}>
              {mode === "login" ? "Sign up" : "Log in"}
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default AuthForm;
