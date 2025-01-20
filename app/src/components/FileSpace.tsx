import { AuthContext, User } from "./AuthProvider";
import { useContext, useEffect, useState } from "react";
// import AWS from "aws-sdk";
import { listFiles } from "./ListFiles";
import FileUploadModal from './FileUploadModal';
import "bootstrap/dist/css/bootstrap.min.css";

const FileSpace: React.FC = () => {
  const context = useContext(AuthContext);
  const user = context?.user as User;
  const [files, setFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const refreshFiles = async () => {
    if (user) {
      setLoading(true);
      const fileNames = await listFiles(user["cognito:username"]);
      setFiles(fileNames);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      refreshFiles();
    }
  }, [user]);

  // useEffect(() => {
  //   listFiles();
  // }, [user]);

  return (
    <div className="bg-light p-3 position-relative min-vh-100">
      {loading ? (
        <div className="d-flex justify-content-center mt-5">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      ) : (
        <ul>
          {files.map((file) => (
            <li key={file}>{file}</li>
          ))}
        </ul>
      )}

      <button
        className="btn btn-primary rounded-circle position-fixed"
        style={{
          bottom: '2rem',
          right: '2rem',
          width: '60px',
          height: '60px',
          fontSize: '24px'
        }}
        onClick={() => setIsModalOpen(true)}
      >
        +
      </button>

      {isModalOpen && (
        <FileUploadModal
          closeModal={() => setIsModalOpen(false)}
          username={user["cognito:username"]}
          onUploadSuccess={refreshFiles}
        />
      )}
    </div>
  );
};

export default FileSpace;
