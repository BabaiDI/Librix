import { useUser } from "@context/UserContext";
import React from "react";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { role } = useUser();

  if (role !== "Admin") {
    return (
      <p className="text-center text-red-500 mt-10">
        Доступ заборонено. Тільки для адміністраторів.
      </p>
    );
  }

  return children;
};

export default PrivateRoute;
