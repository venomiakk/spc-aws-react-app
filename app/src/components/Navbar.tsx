import React, { useState, useContext } from "react";
import LoginButton from "./LoginButton";
import { AuthContext, User } from "./AuthProvider";
import LogoutButton from "./LogoutButton";
import FileUploadModal from "./FileUploadModal";

const Navbar: React.FC = () => {
  const context = useContext(AuthContext);
  const user = context?.user as User;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
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
            <button
              className="btn btn-primary"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              Upload File
            </button>
          </div>
          <div>
            <LogoutButton />
          </div>
        </div>
      </nav>
      {isModalOpen && (
        <FileUploadModal
          closeModal={() => setIsModalOpen(false)}
          username={user["cognito:username"]}
        />
      )}
    </>
  );
};

export default Navbar;
