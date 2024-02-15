import axios from "axios";

export const privateAxios = axios.create({ baseURL: "http://localhost:3000" });

export function setPrivateAccessToken(accessToken: string) {
  privateAxios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${accessToken}`;
}
