import { getStoredToken } from "../../../../../utils/tokenStorage";

export const authInterceptor = async (config: any) => {
  if (!config || !config.headers["Content-Type"]) {
    config.headers["Content-Type"] = "application/json;charset=UTF-8";
  }

  const token = await getStoredToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};
