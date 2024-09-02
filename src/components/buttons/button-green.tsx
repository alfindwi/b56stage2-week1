import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function ButtonGreen({ children, ...props }: ButtonProps) {
  return (
    <button
      style={{
        backgroundColor: "#04A51E",
        padding: "10px",
        color: "white",
        fontSize: "30px",
        width: "100%",
        borderRadius: "30px",
        border: "none",
      }}
      {...props}
    >
      {children}
    </button>
  );
}