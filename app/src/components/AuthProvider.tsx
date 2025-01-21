import { useEffect, useState, createContext, ReactNode } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { sendLogToDB, LogAction } from "./Logger";

const loginURL = import.meta.env.VITE_LOGIN_URL;

interface ExtendedAccessToken {
  exp: number;
}

export interface User {
  sub: string;
  email: string;
  exp: number;
  "cognito:username": string;
}

interface AuthContextType {
  user: User | null;
  login: (idToken: string, accessToken: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}

function setCookie(name: string, value: string, exp: number): void {
  document.cookie = `${name}=${value}; path=/; expires=${exp}; SameSite=None; Secure`;
}

function deleteCookie(name: string): void {
  document.cookie = `${name}=; path=/; expires=0;`;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const idToken = getCookie("id_token");
    const accessToken = getCookie("access_token");

    if (idToken && accessToken) {
      try {
        const decodedIdToken = jwtDecode<JwtPayload & User>(idToken);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decodedIdToken.exp && decodedIdToken.exp < currentTime) {
          console.log("Token expired!");
          logout();
          window.location.href = loginURL;
        } else {
          setUser(decodedIdToken);
        }
      } catch (error) {
        console.error("Token decoding error:", error);
        logout();
        window.location.href = loginURL;
      }
    } else {
      console.log("No user logged in!");
      window.location.href = loginURL;
    }

    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    const idTokenFromUrl = urlParams.get("id_token");
    const accessTokenFromUrl = urlParams.get("access_token");

    if (idTokenFromUrl && accessTokenFromUrl) {
      const decodedIdTokenFromUrl = jwtDecode<JwtPayload & User>(
        idTokenFromUrl
      );
      const decodedAccessTokenFromUrl = jwtDecode<
        JwtPayload & ExtendedAccessToken
      >(accessTokenFromUrl);
      setCookie("id_token", idTokenFromUrl, decodedIdTokenFromUrl.exp);
      setCookie(
        "access_token",
        accessTokenFromUrl,
        decodedAccessTokenFromUrl.exp
      );
      setUser(decodedIdTokenFromUrl);
      sendLogToDB(
        decodedIdTokenFromUrl["cognito:username"],
        LogAction.LOGIN,
        "User logged in"
      );
    }
  }, []);

  const login = (idToken: string, accessToken: string): void => {
    const decodedIdToken = jwtDecode<JwtPayload & User>(idToken);
    const decodedAccessToken = jwtDecode<JwtPayload & ExtendedAccessToken>(
      accessToken
    );
    setCookie("id_token", idToken, decodedIdToken.exp);
    setCookie("access_token", accessToken, decodedAccessToken.exp);
    setUser(decodedIdToken);
    sendLogToDB(
      decodedIdToken["cognito:username"],
      LogAction.LOGIN,
      "User logged in"
    );
  };

  const logout = (): void => {
    deleteCookie("id_token");
    deleteCookie("access_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
