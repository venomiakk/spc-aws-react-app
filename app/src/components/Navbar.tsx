import LoginButton from "./LoginButton";
import { AuthContext, User } from "./AuthProvider";
import { useContext } from "react";
import LogoutButton from "./LogoutButton";

const Navbar: React.FC = () => {
  const context = useContext(AuthContext);
  const user = context?.user as User;
  return (
    <nav className="navbar sticky-top" style={{ backgroundColor: "#e3f2fd" }}>
      <div className="container-fluid">
        {user ? (
          <>
            <p>Hello, {user["cognito:username"]}</p>
          </>
        ) : (
          <LoginButton />
        )}
        <div>
          <button>upload file</button>
        </div>
        <div>
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
