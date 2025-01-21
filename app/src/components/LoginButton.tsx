const loginURL = import.meta.env.VITE_LOGIN_URL;

// TODO: add params to redirect in loginURL
const LoginButton = () => {
  const goToLoginPage = () => {
    window.location.href = loginURL;
  };

  return (
    <button onClick={goToLoginPage} className="custom_button_pos">
      Login
    </button>
  );
};

export default LoginButton;
