import React, { createContext, useCallback, useEffect, useState } from "react";
import { localStorageKeys } from "../config/localStorageKeys";
import { useQuery } from "react-query";
import { userService } from "../services/userService";
import { toast } from "react-toastify";
import { LaunchScreen } from "../../view/components/LaunchScreen";

interface AuthContextValue {
  signedIn: boolean;
  signin(accessToken: string): void;
  signout(): void;
}

// Cria o contexto de autenticação com valores iniciais vazios
export const AuthContext = createContext<AuthContextValue>(
  {} as AuthContextValue
);

// Componente que provê o contexto de autenticação para seus filhos
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(
      localStorageKeys.ACCESS_TOKEN
    );
    
    return !!storedAccessToken;
  });

  const [userId, setUserId] = useState<number | undefined>(undefined);

  const { isError, isFetching, isSuccess, remove } = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      if (userId === undefined) {
        throw new Error("User ID is not defined");
      }
      return userService.me(userId);
    },
    enabled: signedIn && userId !== undefined,
    staleTime: Infinity,
    onSuccess: () => {
      console.log("User data fetched successfully");
    }
  });

  const signin = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);

    setSignedIn(true);
  }, []);
  

  const signout = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    remove();
    setSignedIn(false);
    setUserId(undefined);
  }, [remove]);

  useEffect(() => {
    if (signedIn) {
      const payload = JSON.parse(atob(localStorage.getItem(localStorageKeys.ACCESS_TOKEN)?.split('.')[1] || ""));
      setUserId(payload.id);
    } else {
      setUserId(undefined);
    }
  }, [signedIn]);

  useEffect(() => {
    if (isError) {
      signout();
      toast.error("Your session has expired!");
    }
  }, [isError, signout]);

  return (
    <AuthContext.Provider
      value={{
        signedIn: isSuccess && signedIn,
        signin,
        signout,
      }}
    >
      <LaunchScreen isLoading={isFetching} />

      {!isFetching && children}
    </AuthContext.Provider>
  );
}
