"use client";
import type { UserContext } from "@/types";
import { UserContextProps } from "@/types/types";

import { createContext, ReactNode, useContext, useState } from "react";

const UserContextType = createContext<UserContextProps | undefined>(undefined);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [userType, setUserType] = useState<UserContext>(null);
  return (
    <UserContextType.Provider value={{ userType, setUserType }}>
      {children}
    </UserContextType.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContextType);

  if (!context) {
    throw new Error("UserContextType must be used within ModalProvider");
  }
  return context;
}
