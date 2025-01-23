import { v4 as uuid } from "uuid";
// import axios from "axios";
import AWS from "aws-sdk";

// const logs_endpoint = import.meta.env.VITE_LOGS_API;
const AWSREGION = import.meta.env.VITE_AWS_REGION;
const APPCLIENTID = import.meta.env.VITE_COGNITO_APPCLIENT_ID;
const IDENTITYPOOLID = import.meta.env.VITE_IDENTITY_POOL_ID;
const USERPOOLID = import.meta.env.VITE_USER_POOL_ID;
const USERNAME = import.meta.env.VITE_FILE_PROVIDER;
const PASSWORD = import.meta.env.VITE_FILE_PROVIDER_CREDS;

export enum LogAction {
  LOGIN = "LOGIN",
  F_DOWNLOAD = "FILE DOWNLOAD",
  F_UPLOAD = "FILE UPLOAD",
}

export const sendLogToDB = async (
  username: string,
  action: LogAction,
  description: string
): Promise<void> => {
  const log_item = {
    log_id: uuid(),
    username: username,
    action: action,
    date: new Date().toISOString(),
    description: description,
  };

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

    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const params = {
      TableName: "spc-logs",
      Item: log_item,
    };

    try {
      await dynamoDB.put(params).promise();
      // .then((data) => {
      //   console.log("Log saved to DynamoDB:", data);
      //   console.log("Log saved to DynamoDB:", log_item);
      // });
    } catch (error) {
      console.error("Error saving log to DynamoDB:", error);
      if (error instanceof Error) {
        throw new Error(`Failed to save log: ${error.message}`);
      } else {
        throw new Error("Failed to save log: Unknown error");
      }
    }
  } catch (error) {
    console.error("Error sending log to database:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to send log: ${error.message}`);
    } else {
      throw new Error("Failed to send log: Unknown error");
    }
  }
  // try {
  //   const response = await axios.post(logs_endpoint, log_item);
  //   if (response.status !== 200) {
  //     throw new Error("Failed to send log to database");
  //   }
  //   console.log("Log sent successfully");
  // } catch (error) {
  //   console.error("Failed to send log to database:", error);
  // }
};
