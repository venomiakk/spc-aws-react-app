import React, { useContext } from "react";
import LoginButton from "./LoginButton";
import { AuthContext, User } from "./AuthProvider";
import LogoutButton from "./LogoutButton";

const Navbar: React.FC = () => {
  const context = useContext(AuthContext);
  const user = context?.user as User;

  return (
    <>
      <nav
        className="navbar sticky-top bg-dark border-bottom border-secondary"
      >
        <div className="container-fluid">
          {user ? (
            <>
              <p
                style={{
                  fontSize: "1.5rem",
                }}
              >
                Hello, {user["cognito:username"]}
              </p>
            </>
          ) : (
            <LoginButton />
          )}

          <div>
            <LogoutButton />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
