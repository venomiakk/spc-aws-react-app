/*
http://localhost:5173/#id_token=eyJraWQiOiJVWHFwaTIrdTBySzR2d2hnMFRcL0xDWVNrUTYzRlhFUldjeGkrdTV5TmdnUT0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiY0xteThIZTJYU1Y0WVhYUVNPWVJUQSIsInN1YiI6IjMzMTRjODkyLTkwNTEtNzA0Zi0zZDAyLWNiNTE4NmM4M2ExZSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtY2VudHJhbC0xLmFtYXpvbmF3cy5jb21cL2V1LWNlbnRyYWwtMV80b2ZXRkJHUzEiLCJjb2duaXRvOnVzZXJuYW1lIjoidGVzdDEiLCJhdWQiOiI0Zm80bW1ic21qbjVxNjFtanZ1ZHFwbWFrbSIsImV2ZW50X2lkIjoiYWQ1ZDM5YjUtZWU5My00MDViLWI5NTMtNTdiMmY0MWQxMWZlIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE3MzQ5MDQyNjQsImV4cCI6MTczNDkwNzg2NCwiaWF0IjoxNzM0OTA0MjY0LCJqdGkiOiIwMmYxZDY5MC00ZWU2LTRjYTMtYTRjYi01NjY2M2E5ZjhiYzUiLCJlbWFpbCI6InhlaG9iMTg2NTZAYWxlaXRhci5jb20ifQ.PH3QZsd16_mMh3UT6dO54Qugy1UFYjfjCBgCnOvyYuGViMyhvvX3PDOuHNvClA_BIvnFJrwqiT443LPXi7RPZk6ufonG2p4MFIK558Ms4DgzMKLJXU-wtzBjPe2r2dbct2blom_8UrhQUK43bdhFhJc4MTYayvi3gtVY5pQycfTZQR2BzhCDbcoJ2auL2N_CsoKiy8wKqycBccUTq7R_UayLz5Q0ngF39ziyaKOJg6uBgRRPG9Eo8zcnsgAlaQCOaZbW1ZeeBwrxNYcsBVCVToSAc-5fLPMsGHB3gHGtIP9Tq8UUcK1xPlLeZ4CB3NddG-K5QM-zd3vtXAllae8_MA&access_token=eyJraWQiOiJtN1RGNGtnZWpyVzc4V1BxR05xTU1lYWV5bzBDWHhyRUNIZ3pFNSttWFgwPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzMzE0Yzg5Mi05MDUxLTcwNGYtM2QwMi1jYjUxODZjODNhMWUiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtY2VudHJhbC0xLmFtYXpvbmF3cy5jb21cL2V1LWNlbnRyYWwtMV80b2ZXRkJHUzEiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiI0Zm80bW1ic21qbjVxNjFtanZ1ZHFwbWFrbSIsImV2ZW50X2lkIjoiYWQ1ZDM5YjUtZWU5My00MDViLWI5NTMtNTdiMmY0MWQxMWZlIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJvcGVuaWQgZW1haWwiLCJhdXRoX3RpbWUiOjE3MzQ5MDQyNjQsImV4cCI6MTczNDkwNzg2NCwiaWF0IjoxNzM0OTA0MjY0LCJqdGkiOiIxODI3ZTUyMi03OWIwLTRhODctODllZS02Njg4YzcxNjI4NWEiLCJ1c2VybmFtZSI6InRlc3QxIn0.JAFF8_X-s3DJjrmQPTsl9c5Lv4n-HiaFNGcBDHYFo4f5lR2VamD4l2S8oRY8wXwN0b7qo8lGW3vkIWR6LfAcNkIOx9pKDXVuDgjKJ_vQVtrUPGNiHtSH5VYoPIMCzYoUaNTK84bGlDa5FtWVt0bHD8r4JQ-bfJ6lVM0dgEjLH17KWtXp-uqUCNEbe-kINLbQdQZ4sXpngI0sRbc_lqpZYYfZl9fz9Txcn41tgza3z5i0Fy1xVm5mr0oAq0TaJX6oJb7rXc6KnGpxOpfF0GMZlj4aM7qDCVw0D4aZ_u_VeW1mTWvGzrgCDLhkm6cHaN7iPb0mmU_W6R3MFuc6cvQZiQ&expires_in=3600&token_type=Bearer

http://localhost:5173/
#id_token=eyJraWQiOiJVWHFwaTIrdTBySzR2d2hnMFRcL0xDWVNrUTYzRlhFUldjeGkrdTV5TmdnUT0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiY0xteThIZTJYU1Y0WVhYUVNPWVJUQSIsInN1YiI6IjMzMTRjODkyLTkwNTEtNzA0Zi0zZDAyLWNiNTE4NmM4M2ExZSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtY2VudHJhbC0xLmFtYXpvbmF3cy5jb21cL2V1LWNlbnRyYWwtMV80b2ZXRkJHUzEiLCJjb2duaXRvOnVzZXJuYW1lIjoidGVzdDEiLCJhdWQiOiI0Zm80bW1ic21qbjVxNjFtanZ1ZHFwbWFrbSIsImV2ZW50X2lkIjoiYWQ1ZDM5YjUtZWU5My00MDViLWI5NTMtNTdiMmY0MWQxMWZlIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE3MzQ5MDQyNjQsImV4cCI6MTczNDkwNzg2NCwiaWF0IjoxNzM0OTA0MjY0LCJqdGkiOiIwMmYxZDY5MC00ZWU2LTRjYTMtYTRjYi01NjY2M2E5ZjhiYzUiLCJlbWFpbCI6InhlaG9iMTg2NTZAYWxlaXRhci5jb20ifQ.PH3QZsd16_mMh3UT6dO54Qugy1UFYjfjCBgCnOvyYuGViMyhvvX3PDOuHNvClA_BIvnFJrwqiT443LPXi7RPZk6ufonG2p4MFIK558Ms4DgzMKLJXU-wtzBjPe2r2dbct2blom_8UrhQUK43bdhFhJc4MTYayvi3gtVY5pQycfTZQR2BzhCDbcoJ2auL2N_CsoKiy8wKqycBccUTq7R_UayLz5Q0ngF39ziyaKOJg6uBgRRPG9Eo8zcnsgAlaQCOaZbW1ZeeBwrxNYcsBVCVToSAc-5fLPMsGHB3gHGtIP9Tq8UUcK1xPlLeZ4CB3NddG-K5QM-zd3vtXAllae8_MA
&access_token=eyJraWQiOiJtN1RGNGtnZWpyVzc4V1BxR05xTU1lYWV5bzBDWHhyRUNIZ3pFNSttWFgwPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzMzE0Yzg5Mi05MDUxLTcwNGYtM2QwMi1jYjUxODZjODNhMWUiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtY2VudHJhbC0xLmFtYXpvbmF3cy5jb21cL2V1LWNlbnRyYWwtMV80b2ZXRkJHUzEiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiI0Zm80bW1ic21qbjVxNjFtanZ1ZHFwbWFrbSIsImV2ZW50X2lkIjoiYWQ1ZDM5YjUtZWU5My00MDViLWI5NTMtNTdiMmY0MWQxMWZlIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJvcGVuaWQgZW1haWwiLCJhdXRoX3RpbWUiOjE3MzQ5MDQyNjQsImV4cCI6MTczNDkwNzg2NCwiaWF0IjoxNzM0OTA0MjY0LCJqdGkiOiIxODI3ZTUyMi03OWIwLTRhODctODllZS02Njg4YzcxNjI4NWEiLCJ1c2VybmFtZSI6InRlc3QxIn0.JAFF8_X-s3DJjrmQPTsl9c5Lv4n-HiaFNGcBDHYFo4f5lR2VamD4l2S8oRY8wXwN0b7qo8lGW3vkIWR6LfAcNkIOx9pKDXVuDgjKJ_vQVtrUPGNiHtSH5VYoPIMCzYoUaNTK84bGlDa5FtWVt0bHD8r4JQ-bfJ6lVM0dgEjLH17KWtXp-uqUCNEbe-kINLbQdQZ4sXpngI0sRbc_lqpZYYfZl9fz9Txcn41tgza3z5i0Fy1xVm5mr0oAq0TaJX6oJb7rXc6KnGpxOpfF0GMZlj4aM7qDCVw0D4aZ_u_VeW1mTWvGzrgCDLhkm6cHaN7iPb0mmU_W6R3MFuc6cvQZiQ
&expires_in=3600
&token_type=Bearer
*/

import { useEffect, useState, createContext, ReactNode } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";
const loginURL = import.meta.env.VITE_LOGIN_URL;
// interface ExtendedJwtPayload extends JwtPayload {
//   "cognito:username": string;
// }

interface ExtendedAccessToken {
  exp: number;
}

// Typowanie danych użytkownika
export interface User {
  sub: string; // ID użytkownika (zależy od struktury tokenu)
  username: string;
  email: string;
  exp: number; // Czas wygaśnięcia tokenu
}

// Typowanie kontekstu
interface AuthContextType {
  user: User | null;
  login: (idToken: string, accessToken: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

// Helper do pracy z cookies
function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}

function setCookie(name: string, value: string, exp: number): void {
  const currdate = new Date(exp);
  const date = Math.floor(currdate.getTime() / 1000);
  console.log("date:", date);
  // * i guess it has to be saved as date to cookies
  // TODO change this to date
  // const expires = new Date(Date.now() + hours * 60 * 60 * 1000).toUTCString();
  console.log("expires:", exp);
  // document.cookie = `${name}=${value}; path=/; expires=${expires}; Secure; HttpOnly; SameSite=Strict;`;
  // document.cookie = `${name}=${value}; path=/; expires=${expires};`;
  document.cookie = `${name}=${value}; path=/; expires=${exp}; SameSite=None; Secure`;
  console.log(`setting coockie ${name}`);
}

function deleteCookie(name: string): void {
  document.cookie = `${name}=; path=/; expires=0;`;
}

// Tworzymy kontekst
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Sprawdzanie tokenów w ciasteczkach po załadowaniu aplikacji
  useEffect(() => {
    const idToken = getCookie("id_token");
    const accessToken = getCookie("access_token");

    if (idToken && accessToken) {
      try {
        const decodedIdToken = jwtDecode<JwtPayload & User>(idToken);
        const currentTime = Date.now();

        // Sprawdzamy, czy token nie wygasł
        if (decodedIdToken.exp && decodedIdToken.exp < currentTime) {
          //TODO check exp correctly
          // Token wygasł, wylogowujemy użytkownika
          console.log("Token expired!");
          logout();
          // window.location.href = loginURL;
        } else {
          // Token jest ważny, ustawiamy użytkownika
          setUser(decodedIdToken);
        }
      } catch (error) {
        console.error("Token decoding error:", error);
        logout();
        // window.location.href = loginURL;
      }
    } else {
      console.log("No user logged in!");
      // window.location.href = loginURL;
    }
    // ? can this cause any problems?
    // Jeśli w URL znajdują się tokeny, zapisujemy je w ciasteczkach
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    const idTokenFromUrl = urlParams.get("id_token");
    const accessTokenFromUrl = urlParams.get("access_token");

    if (idTokenFromUrl && accessTokenFromUrl) {
      //TODO back to normal date
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

      // Opcjonalnie, przekierowanie po zalogowaniu
      // window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const login = (idToken: string, accessToken: string): void => {
    //TODO back to normal date
    const decodedIdToken = jwtDecode<JwtPayload & User>(idToken);
    const decodedAccessToken = jwtDecode<JwtPayload & ExtendedAccessToken>(
      accessToken
    );
    setCookie("id_token", idToken, decodedIdToken.exp); // Zapisanie tokenu na 60 minut (1/24 dnia)
    setCookie("access_token", accessToken, decodedAccessToken.exp); // Zapisanie tokenu na 60 minut (1/24 dnia)
    setUser(decodedIdToken);
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
