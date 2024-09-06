import React, { createContext, useReducer, useState } from "react";
import { User } from "../types/user";

interface AuthContextType {
  state: AuthState
  dispatch: React.Dispatch<AuthAction>
}

interface AuthState{
  user : User
}

type AuthAction = {type : "SET_USER", payload: User}  | {type : "CLEAR_USER"}

const initialState : AuthState = {} as AuthState

function authReducer(state: AuthState, action: AuthAction) {
  switch (action.type) {
    case "SET_USER":
      return{user: action.payload}
    case "CLEAR_USER":
      return{user: {} as User}
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