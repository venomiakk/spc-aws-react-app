import { AuthContext, User } from "./AuthProvider";
import { useContext, useEffect, useState } from "react";
import AWS from "aws-sdk";
import "bootstrap/dist/css/bootstrap.min.css";
import { listFiles } from "./ListFiles";

// const AWSREGION = import.meta.env.VITE_AWS_REGION;
// const APPCLIENTID = import.meta.env.VITE_COGNITO_APPCLIENT_ID;
// const IDENTITYPOOLID = import.meta.env.VITE_IDENTITY_POOL_ID;
// const USERPOOLID = import.meta.env.VITE_USER_POOL_ID;
// const USERNAME = import.meta.env.VITE_FILE_PROVIDER;
// const PASSWORD = import.meta.env.VITE_FILE_PROVIDER_CREDS;
// const S3BUCKET = import.meta.env.VITE_S3_BUCKET_NAME;

const FileSpace: React.FC = () => {
  const context = useContext(AuthContext);
  const user = context?.user as User;
  const [files, setFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getFiles = async () => {
    const fileNames = await listFiles(user["cognito:username"]);
    setFiles(fileNames);
  };

  useEffect(() => {
    const fetchFiles = async () => {
      const fileNames = await listFiles(user["cognito:username"]);
      setFiles(fileNames);
      setLoading(false);
    };
    setLoading(true);
    if (user) {
      fetchFiles();
    }
  }, [user]);

  // useEffect(() => {
  //   listFiles();
  // }, [user]);

  return (
    <div className="bg-light p-3">
      {loading ? (
        <div className="d-flex justify-content-center mt-5">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only "></span>
          </div>
        </div>
      ) : (
        <ul>
          {files.map((file) => (
            <li key={file}>{file}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileSpace;
