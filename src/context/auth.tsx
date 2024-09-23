import React, { createContext, useReducer} from "react";
import { UserEntity } from "../entities/user";

interface AuthContextType {
  state: AuthState
  dispatch: React.Dispatch<AuthAction>
}

interface AuthState{
  user : UserEntity
}

type AuthAction = {type : "SET_USER", payload: UserEntity}  | {type : "CLEAR_USER"}

const initialState : AuthState = {} as AuthState

function authReducer(state: AuthState, action: AuthAction) {
  switch (action.type) {
    case "SET_USER":
      return{user: action.payload}
    case "CLEAR_USER":
      return{user: {} as UserEntity}
    default:
      return state
  }
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer (authReducer, initialState)

  return (
    <AuthContext.Provider value={{state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}