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

// TODO is something wrong with token?
// ? maybe something wrong with cookies?
const configureCognitoIdentity = (idToken: string) => {
  console.warn("Configuring Cognito Identity with token:", idToken);
  AWS.config.update({
    region: AWSREGION,
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: IDENTITYPOOLID,
      Logins: {
        [`cognito-idp.${AWSREGION}.amazonaws.com/${USERPOOLID}`]: idToken,
      },
    }),
  });
  if (AWS.config.credentials) {
    (AWS.config.credentials as AWS.CognitoIdentityCredentials).get(function (
      err
    ) {
      if (err) {
        console.log("Error getting credentials:", err);
        console.error("Error getting credentials:", err);
      } else {
        console.log("AWS credentials:", AWS.config.credentials);
      }
    });
  } else {
    console.error("AWS.config.credentials is null or undefined");
  }
  // Force refresh the credentials
  // (AWS.config.credentials as AWS.CognitoIdentityCredentials).refresh(
  //   (error) => {
  //     if (error) {
  //       console.error("Error refreshing credentials:", error);
  //     } else {
  //       console.log("Successfully refreshed credentials");
  //     }
  //   }
  // );
};

export { s3, credentials, configureCognitoIdentity };
