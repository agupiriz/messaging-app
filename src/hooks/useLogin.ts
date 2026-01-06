import { useCallback } from "react";

import AuthService from "../api/domain/auth/auth.service";
import { LoginRequest } from "../api/domain/auth/auth.types";
import useQuery from "./useQuery";

const authService = new AuthService();

export const useLogin = () => {
  const login = useCallback(async (data: LoginRequest) => {
    return authService.login(data);
  }, []);

  return useQuery({ fetchFn: login });
};
