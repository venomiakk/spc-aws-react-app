import { v4 as uuid } from "uuid";
import axios from "axios";

const logs_endpoint = import.meta.env.VITE_LOGS_API;

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
    description: description,
  };
  // console.log("Uncomment the code to send logs to the database");
  try {
    const response = await axios.post(logs_endpoint, log_item);
    if (response.status !== 200) {
      throw new Error("Failed to send log to database");
    }
    console.log("Log sent successfully");
  } catch (error) {
    console.error("Failed to send log to database:", error);
  }
};
