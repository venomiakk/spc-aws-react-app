import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

interface FileCardProps {
  fileName: string;
  onClick: () => void;
}

const getFileExtension = (fileName: string): string => {
  return fileName.split(".").pop()?.toLowerCase() || "";
};

const getCleanFileName = (fullPath: string): string => {
  // Remove path and get just filename
  const fileName = fullPath.split("/").pop() || "";
  return fileName;
  // Remove extension
  //   return fileName.substring(0, fileName.lastIndexOf(".")) || fileName;
};

const getFileIcon = (fileName: string): string => {
  const extension = getFileExtension(fileName);
  switch (extension) {
    case "pdf":
      return "bi-file-pdf";
    case "doc":
    case "docx":
      return "bi-file-word";
    case "xls":
    case "xlsx":
      return "bi-file-excel";
    case "zip":
    case "rar":
      return "bi-file-zip";
    case "jpg":
    case "jpeg":
    case "png":
      return "bi-file-image";
    default:
      return "bi-file-text";
  }
};

const FileCard: React.FC<FileCardProps> = ({ fileName, onClick }) => {
  const cleanName = getCleanFileName(fileName);
  const iconClass = getFileIcon(fileName);
  return (
    <div
      className="card m-2"
      style={{ width: "18rem", cursor: "pointer" }}
      onClick={onClick}
    >
      <div className="card-body">
        <div className="d-flex align-items-center mb-2">
          <i className={`bi ${iconClass} fs-4 me-2`}></i>
          <h5 className="card-title text-truncate mb-0">{cleanName}</h5>
        </div>
        {/* <p className="card-text">
          <small className="text-muted">Click to view details</small>
        </p> */}
      </div>
    </div>
  );
};

export default FileCard;
