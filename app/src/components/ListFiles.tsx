import AWS from "aws-sdk";

const AWSREGION = import.meta.env.VITE_AWS_REGION;
const APPCLIENTID = import.meta.env.VITE_COGNITO_APPCLIENT_ID;
const IDENTITYPOOLID = import.meta.env.VITE_IDENTITY_POOL_ID;
const USERPOOLID = import.meta.env.VITE_USER_POOL_ID;
const USERNAME = import.meta.env.VITE_FILE_PROVIDER;
const PASSWORD = import.meta.env.VITE_FILE_PROVIDER_CREDS;
const S3BUCKET = import.meta.env.VITE_S3_BUCKET_NAME;

// TODO add toast on error

export const listFiles = async (username: string): Promise<string[]> => {
  AWS.config.update({
    region: AWSREGION,
  });
  const cognito = new AWS.CognitoIdentityServiceProvider();
  const loginparams = {
    AuthFlow: "USER_PASSWORD_AUTH", // Użyj odpowiedniego flow, np. 'USER_PASSWORD_AUTH'
    ClientId: APPCLIENTID, // App Client ID z Twojego Cognito User Pool
    AuthParameters: {
      USERNAME: USERNAME, // Nazwa użytkownika
      PASSWORD: PASSWORD, // Hasło użytkownika
    },
  };

  try {
    const authData = await cognito.initiateAuth(loginparams).promise();
    const idToken = authData.AuthenticationResult?.IdToken;

    if (!idToken) {
      throw new Error("Failed to retrieve ID token");
    }

    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: IDENTITYPOOLID,
      Logins: {
        [`cognito-idp.${AWSREGION}.amazonaws.com/${USERPOOLID}`]: idToken,
      },
    });

    await (
      AWS.config.credentials as AWS.CognitoIdentityCredentials
    ).getPromise();

    const s3 = new AWS.S3();
    const bucketparams = {
      Bucket: S3BUCKET,
      Prefix: `${username}/`, //TODO: error handling?
    };
    const response = await s3.listObjectsV2(bucketparams).promise();
    const fileNames =
      response.Contents?.map((item) => item.Key).filter(
        (key): key is string => !!key
      ) || [];
    return fileNames;
  } catch (error) {
    console.error("Error listing files from S3:", error);
    alert("Error listing files from S3");
    return [];
  }
};
