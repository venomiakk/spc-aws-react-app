import { AuthContext, User } from "./AuthProvider";
import { useContext } from "react";


const FileSpace = () => {
  const context = useContext(AuthContext);
  const user = context?.user as User;
  console.log(user);
  return <div>FileSpace</div>;
};

export default FileSpace;
