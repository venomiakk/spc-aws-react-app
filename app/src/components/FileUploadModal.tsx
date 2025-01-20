import React, { useState } from "react";
import AWS from "aws-sdk";
import { sendLogToDB, LogAction } from "./Logger";

interface FileUploadModalProps {
  closeModal: () => void;
  username?: string;
  onUploadSuccess: () => void;
  showToast: (
    message: string,
    type: "success" | "error" | "processing"
  ) => void;
}

const FileUploadModal: React.FC<FileUploadModalProps> = ({
  closeModal,
  username = "",
  onUploadSuccess,
  showToast,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

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
      // TODO: Add zip 'fake' handilng
      if (file.name.toLowerCase().endsWith(".zip")) {
        showToast("Processing zip file...", "processing");
        await new Promise((resolve) => setTimeout(resolve, 3000)); // 3 second delay
      }
      const s3 = new AWS.S3();
      await s3.upload(params).promise();
      showToast(`File ${file.name} uploaded successfully!`, "success");
      sendLogToDB(username, LogAction.F_UPLOAD, `File ${file_path} uploaded`);
      onUploadSuccess();
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
      {/* Modal Content */}
      <div
        className="modal"
        style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
      >
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
    </>
  );
};

export default FileUploadModal;
