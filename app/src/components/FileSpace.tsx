import { AuthContext, User } from "./AuthProvider";
import { useContext, useEffect, useState } from "react";
import { s3, credentials } from "./AWSConfig";

const S3BUCKET = import.meta.env.VITE_S3_BUCKET_NAME;

const FileSpace: React.FC = () => {
  const context = useContext(AuthContext);
  const user = context?.user as User;
  const [files, setFiles] = useState<string[]>([]);

  //TODO
  // * ideas:
  // get files using lambda
  // get files using predefined user
  // change to own login page and save credentials in cookies
  // use new userpool and app client with guided setup
  useEffect(() => {
    // credentials.get((err) => {
    //   if (err) {
    //     console.error("Error retrieving credentials:", err);
    //   } else {
    //     console.log("Successfully retrieved credentials:", credentials);
    //   }
    // });
    // const params = {
    //   Bucket: S3BUCKET,
    //   Prefix: "data/",
    // };
    // if (user) {
    //   s3.listObjectsV2(
    //     params,
    //     (err: unknown, data: AWS.S3.ListObjectsV2Output) => {
    //       if (err) {
    //         console.log(err);
    //       } else {
    //         console.log(data);
    //         const keys = data.Contents?.map((object) => object.Key) || [];
    //         setFiles(keys as string[]);
    //       }
    //     }
    //   );
    // }
  }, [user]);

  return <div>FileSpace</div>;
};

export default FileSpace;
