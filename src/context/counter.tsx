import React, { createContext, useState } from "react";

interface CounterContextType {
  counter: number;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
}

export const CounterContext = createContext<CounterContextType>(
  {} as CounterContextType
);

export function CounterProvider({ children }: { children: React.ReactNode }) {
  const [counter, setCounter] = useState<number>(0);

  return (
    <CounterContext.Provider value={{ counter, setCounter }}>
      {children}
    </CounterContext.Provider>
  );
}