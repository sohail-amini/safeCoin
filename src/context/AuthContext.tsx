import React, {
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from "react";

import { authReducer, initialState, AuthState } from "./authReducer";

// Define the context with an initial state
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Define the type for the context
interface AuthContextType {
  authState: AuthState;
  dispatchAuth: React.Dispatch<any>; // Replace with the action type used in your reducer
  isLoggedIn: boolean;
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a provider!");
  }
  return context;
};

const initializeAuthState = (defaultValue: AuthState) => {
  try {
    const persistedState = JSON.parse(localStorage.getItem("userInfo") || "");
    return persistedState || defaultValue;
  } catch (error) {
    console.error("Error initializing auth state:", error);
    return defaultValue;
  }
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, dispatchAuth] = useReducer(
    authReducer,
    initialState,
    initializeAuthState
  );

  const isLoggedIn = useMemo(() => {
    return authState.isLoggedIn && authState.name !== null;
  }, [authState]);

  const contextValue: AuthContextType = {
    authState,
    dispatchAuth,
    isLoggedIn,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
