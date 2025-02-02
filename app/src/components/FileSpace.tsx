import { AuthContext, User } from "./AuthProvider";
import { useContext, useEffect, useState } from "react";
import FileCard from "./FileCard";
import FileDetailsModal from "./FileDetailsModal";
import { listFiles } from "./ListFiles";
import FileUploadModal from "./FileUploadModal";
import "bootstrap/dist/css/bootstrap.min.css";

interface Toast {
  message: string;
  type: "success" | "error" | "processing";
}

const FileSpace: React.FC = () => {
  const context = useContext(AuthContext);
  const user = context?.user as User;
  const [files, setFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const showToast = (
    message: string,
    type: "success" | "error" | "processing"
  ) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

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
    <div className="bg-dark h-100">
      {loading ? (
        <div className="d-flex justify-content-center mt-5">
          <div className="spinner-border spinner_color" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      ) : (
        <div className="d-flex flex-wrap p-3">
          {files.map((file) => (
            <FileCard
              key={file}
              fileName={file}
              onClick={() => setSelectedFile(file)}
            />
          ))}
        </div>
      )}

      <button
        className="rounded-circle position-fixed custom_button_pos"
        style={{
          bottom: "2rem",
          right: "2rem",
          width: "60px",
          height: "60px",
          fontSize: "30px",
        }}
        onClick={() => setIsModalOpen(true)}
      >
        <i className="bi bi-cloud-upload"></i>
      </button>

      {isModalOpen && (
        <FileUploadModal
          closeModal={() => setIsModalOpen(false)}
          username={user["cognito:username"]}
          onUploadSuccess={refreshFiles}
          showToast={showToast}
        />
      )}

      {selectedFile && (
        <FileDetailsModal
          fileName={selectedFile}
          closeModal={() => setSelectedFile(null)}
          username={user["cognito:username"]}
        />
      )}

      {toast && (
        <div
          className="position-fixed top-0 end-0 p-3"
          style={{ zIndex: 9999 }}
        >
          <div
            className={`toast show align-items-center text-white ${
              toast.type === "success"
                ? "bg-success"
                : toast.type === "processing"
                ? "bg-primary text-dark"
                : "bg-danger"
            }`}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="d-flex">
              <div className="toast-body">{toast.message}</div>
              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                onClick={() => setToast(null)}
              ></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileSpace;
