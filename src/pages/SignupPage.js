import AuthForm from "./partials/AuthForm";

function SignupPage({ onSignup }) {
  return (
    <AuthForm
      mode="signup"
      title="Create your BookShelf account"
      subtitle="Join the smart library platform built for better academic book discovery."
      submitLabel="Create account"
      onSubmitAuth={onSignup}
    />
  );
}

export default SignupPage;
