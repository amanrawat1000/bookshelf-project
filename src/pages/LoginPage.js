import AuthForm from "./partials/AuthForm";

function LoginPage({ onLogin }) {
  return (
    <AuthForm
      mode="login"
      title="Welcome back to BookShelf"
      subtitle="Log in to manage your shelf, saved books, and recommendations."
      submitLabel="Log in"
      onSubmitAuth={onLogin}
    />
  );
}

export default LoginPage;
