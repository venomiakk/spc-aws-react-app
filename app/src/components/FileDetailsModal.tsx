import React, { useEffect, useState } from "react";
import AWS from "aws-sdk";

interface FileVersion {
  VersionId: string;
  LastModified: Date;
  Size: number;
}

interface FileDetailsModalProps {
  fileName: string;
  closeModal: () => void;
}


const FileDetailsModal: React.FC<FileDetailsModalProps> = ({
  fileName,
  closeModal,
}) => {
  const [versions, setVersions] = useState<FileVersion[]>([]);
  const [loading, setLoading] = useState(true);

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
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading file:", error);
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
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              File Details: {fileName.split("/").pop()}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={closeModal}
            ></button>
          </div>
          <div className="modal-body" style={{ maxHeight: "60vh" }}>
            {loading ? (
              <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Version</th>
                      <th>Last Modified</th>
                      <th>Size</th>
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
                            className="btn btn-sm btn-primary"
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
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
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
