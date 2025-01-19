import LoginButton from "./LoginButton";
import { AuthContext, User } from "./AuthProvider";
import { useContext } from "react";


const Navbar: React.FC = () => {
  const context = useContext(AuthContext);
  const user = context?.user as User;
  // console.log(user);
  if (user) {
    const username = user["cognito:username"];
    return (
      <nav className="navbar sticky-top" style={{ backgroundColor: "#e3f2fd" }}>
        <div className="container-fluid">
          <p>Hello, {username}</p>
          <LoginButton />
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar sticky-top" style={{ backgroundColor: "#e3f2fd" }}>
      <div className="container-fluid">
        <LoginButton />
      </div>
    </nav>
  );
};

export default Navbar;
