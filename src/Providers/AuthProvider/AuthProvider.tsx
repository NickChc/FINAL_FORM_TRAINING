import { PropsWithChildren, useState, useEffect } from "react";
import { AuthContext, TAuthStage_Enum } from "@src/Providers/AuthProvider";
import { jwtDecode } from "jwt-decode";
import { TUserTokens, TUserData } from "@src/@types/requestTypes";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@src/config/localStorageKeys";
import { setPrivateAccessToken } from "@src/utils/privateAxios";
import { publicAxios } from "@src/utils/publicAxios";

export function AuthProvider({ children }: PropsWithChildren) {
  const [userData, setUserData] = useState<TUserData>();
  const [authStage, setAuthStage] = useState<TAuthStage_Enum>(
    TAuthStage_Enum.PENDING
  );

  function setAuthData(tokens: TUserTokens) {
    const tokenData: TUserData = jwtDecode(tokens.access_token);
    setUserData(tokenData);
    localStorage.setItem(ACCESS_TOKEN, tokens.access_token);
    localStorage.setItem(REFRESH_TOKEN, tokens.refresh_token);
    setPrivateAccessToken(tokens.access_token);
    setAuthStage(TAuthStage_Enum.AUTHORIZED);
  }


  function logOut() {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    setAuthStage(TAuthStage_Enum.UNAUTHORIZED);
    setPrivateAccessToken("");
  }

  async function updateTokens(refreshToken: string) {
    try {
      const response = await publicAxios.post<TUserTokens>(
        "auth/update-tokens",
        { refresh_token: refreshToken }
      );
      setAuthData(response.data);
    } catch (error: any) {
      console.log(error.message);
      setAuthStage(TAuthStage_Enum.UNAUTHORIZED);
    }
  }

  useEffect(() => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);

    if (refreshToken) {
        updateTokens(refreshToken);
    } else {
        setAuthStage(TAuthStage_Enum.UNAUTHORIZED);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        setAuthData,
        authStage,
        setAuthStage,
        userData,
        setUserData,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
