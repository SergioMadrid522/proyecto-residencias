"use client";

import { ModalState } from "@/types";
import { ModalContextType } from "@/types/types";
import { createContext, useContext, useState, ReactNode } from "react";

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<ModalState>(null);

  return (
    <ModalContext.Provider value={{ modal, setModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useOpenModal() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useOpenModal must be used within ModalProvider");
  }

  return context;
}
