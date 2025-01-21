const loginURL = import.meta.env.VITE_LOGIN_URL;

const LogoutButton = () => {
  const doLogout = () => {
    console.log("logout");
    window.location.href = loginURL;
  };
  return (
    <button onClick={doLogout} className="custom_button_pos">
      Logout
    </button>
  );
};

export default LogoutButton;
