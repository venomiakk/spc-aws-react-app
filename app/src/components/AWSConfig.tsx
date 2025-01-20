import AWS from "aws-sdk";

const AWSREGION = import.meta.env.VITE_AWS_REGION;
const APPCLIENTID = import.meta.env.VITE_COGNITO_APPCLIENT_ID;
const IDENTITYPOOLID = import.meta.env.VITE_IDENTITY_POOL_ID;
const USERPOOLID = import.meta.env.VITE_USER_POOL_ID;

AWS.config.update({
  region: AWSREGION,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IDENTITYPOOLID,
  }),
});
const s3 = new AWS.S3();

const credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: IDENTITYPOOLID,
});

const configureCognitoIdentity = (idToken: string) => {
  // console.log("Configuring Cognito Identity with token:", idToken);
  AWS.config.update({
    region: AWSREGION,
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: IDENTITYPOOLID,
      Logins: {
        [`cognito-idp.${AWSREGION}.amazonaws.com/${USERPOOLID}`]: idToken,
      },
    }),
  });

  // Force refresh the credentials
  (AWS.config.credentials as AWS.CognitoIdentityCredentials).refresh(
    (error) => {
      if (error) {
        console.error("Error refreshing credentials:", error);
      } else {
        console.log("Successfully refreshed credentials");
      }
    }
  );
};

export { s3, credentials, configureCognitoIdentity };
