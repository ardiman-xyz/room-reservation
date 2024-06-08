import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-full min-h-screen flex items-center justify-center bg-home absolute inset-0 bg-cover bg-center">
      <div>{children}</div>
    </main>
  );
};

export default AuthLayout;
