import React, { useEffect, useState } from "react";
import AWS from "aws-sdk";
import { sendLogToDB, LogAction } from "./Logger";
import { v4 as uuid } from "uuid";
import axios from "axios";

const logs_endpoint = import.meta.env.VITE_LOGS_API;

interface FileVersion {
  VersionId: string;
  LastModified: Date;
  Size: number;
}

interface FileDetailsModalProps {
  fileName: string;
  closeModal: () => void;
  username: string;
}

interface SortConfig {
  key: keyof FileVersion;
  direction: "asc" | "desc";
}

const FileDetailsModal: React.FC<FileDetailsModalProps> = ({
  fileName,
  closeModal,
  username,
}) => {
  const [versions, setVersions] = useState<FileVersion[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "LastModified",
    direction: "desc",
  });

  const fetchVersions = async () => {
    try {
      const s3 = new AWS.S3();
      const response = await s3
        .listObjectVersions({
          Bucket: import.meta.env.VITE_S3_BUCKET_NAME,
          Prefix: fileName,
        })
        .promise();

      const fileVersions =
        response.Versions?.map((version) => ({
          VersionId: version.VersionId || "",
          LastModified: version.LastModified || new Date(),
          Size: version.Size || 0,
        })) || [];

      setVersions(fileVersions);
    } catch (error) {
      console.error("Error fetching versions:", error);
    } finally {
      setLoading(false);
    }
  };

  const downloadVersion = async (versionId: string) => {
    try {
      const s3 = new AWS.S3();
      const response = await s3
        .getObject({
          Bucket: import.meta.env.VITE_S3_BUCKET_NAME,
          Key: fileName,
          VersionId: versionId,
        })
        .promise();

      const blob = new Blob([response.Body as Buffer]);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName.split("/").pop() || fileName;

      document.body.appendChild(a);
      await new Promise((resolve) => {
        a.click();
        setTimeout(resolve, 100); // Small delay to ensure download starts
      });

      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const sortData = (
    data: FileVersion[],
    key: keyof FileVersion,
    direction: "asc" | "desc"
  ) => {
    return [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  const handleSort = (key: keyof FileVersion) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
    setVersions(sortData(versions, key, direction));
  };

  const getSortIcon = (key: keyof FileVersion) => {
    if (sortConfig.key !== key) return "bi-arrow-down-up";
    return sortConfig.direction === "asc" ? "bi-arrow-up" : "bi-arrow-down";
  };

  const downloadLatestVersion = async () => {
    if (versions.length > 0) {
      await downloadVersion(versions[0].VersionId);
    }
  };

  useEffect(() => {
    fetchVersions();
  }, [fileName]);

  return (
    <div
      className="modal"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <div className="modal-content bg-dark text-light">
          <div className="modal-header border-secondary">
            <h5 className="modal-title">
              File Details: {fileName.split("/").pop()}
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={closeModal}
            ></button>
          </div>
          <div className="modal-body" style={{ maxHeight: "60vh" }}>
            {loading ? (
              <div className="text-center">
                <div className="spinner-border spinner_color" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <>
                <button
                  className="custom_button_pos mb-3"
                  onClick={downloadLatestVersion}
                >
                  <i className="bi bi-download me-1"></i>
                  Download Latest Version
                </button>
                <div className="table-responsive">
                  <table className="table table-dark table-hover">
                    <thead>
                      <tr>
                        <th
                          onClick={() => handleSort("VersionId")}
                          style={{ cursor: "pointer" }}
                        >
                          Version{" "}
                          <i className={`bi ${getSortIcon("VersionId")}`}></i>
                        </th>
                        <th
                          onClick={() => handleSort("LastModified")}
                          style={{ cursor: "pointer" }}
                        >
                          Last Modified{" "}
                          <i
                            className={`bi ${getSortIcon("LastModified")}`}
                          ></i>
                        </th>
                        <th
                          onClick={() => handleSort("Size")}
                          style={{ cursor: "pointer" }}
                        >
                          Size <i className={`bi ${getSortIcon("Size")}`}></i>
                        </th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {versions.map((version) => (
                        <tr key={version.VersionId}>
                          <td>{version.VersionId.substring(0, 8)}...</td>
                          <td>
                            {new Date(version.LastModified).toLocaleString()}
                          </td>
                          <td>{(version.Size / 1024).toFixed(2)} KB</td>
                          <td>
                            <button
                              className="btn-sm custom_button_pos"
                              onClick={() => downloadVersion(version.VersionId)}
                            >
                              <i className="bi bi-download me-1"></i>
                              Download
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
          <div className="modal-footer border-secondary">
            <button
              type="button"
              className="custom_button_neg"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileDetailsModal;
