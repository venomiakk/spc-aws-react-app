const loginURL = import.meta.env.VITE_LOGIN_URL;

const LogoutButton = () => {
  const doLogout = () => {
    console.log("logout");
    window.location.href = loginURL;
  };
  return (
    <button onClick={doLogout} className="">
      Logout
    </button>
  );
};

export default LogoutButton;
