import React, { useState } from "react";
import AWS from "aws-sdk";
import { sendLogToDB, LogAction } from "./Logger";

interface FileUploadModalProps {
  closeModal: () => void;
  username?: string;
}

interface Toast {
  message: string;
  type: "success" | "error";
}

const FileUploadModal: React.FC<FileUploadModalProps> = ({
  closeModal,
  username = "",
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);

  //TODO: Repair toast
  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const file_path = username
      ? `${username.replace(/^\/+|\/+$/g, "")}/${file.name}` // Remove leading/trailing slashes
      : file.name;

    setUploading(true);
    const params = {
      Bucket: import.meta.env.VITE_S3_BUCKET_NAME,
      Key: file_path,
      Body: file,
    };

    try {
      const s3 = new AWS.S3();
      await s3.upload(params).promise();
      showToast(`File ${file.name} uploaded successfully!`, "success");
      sendLogToDB(username, LogAction.F_UPLOAD, `File ${file_path} uploaded`);
      closeModal();
    } catch (error) {
      console.error("Error uploading file:", error);
      sendLogToDB(
        username,
        LogAction.F_UPLOAD,
        `FAILED: File ${file_path} uploaded, ERROR: ${error}`
      );
      showToast("Error uploading file. Please try again.", "error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <div
        className="modal"
        style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        {/* Modal Content */}
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Upload File</h5>
              <button
                type="button"
                className="btn-close"
                onClick={closeModal}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Choose File</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeModal}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpload}
                disabled={!file || uploading}
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Toast Notification */}
      {toast && (
        <div
          className={`position-fixed top-0 end-0 p-3`}
          style={{ zIndex: 1070 }}
        >
          <div
            className={`toast show align-items-center text-white ${
              toast.type === "success" ? "bg-success" : "bg-danger"
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
    </>
  );
};

export default FileUploadModal;
