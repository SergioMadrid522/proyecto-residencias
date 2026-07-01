"use client";
import { useOpenModal } from "@/context/ModalContext";

export default function AddNewUserButton() {
  const { setModal } = useOpenModal();

  return (
    <button
      onClick={() => {
        setModal({ type: "create-user" });
      }}
      className="border rounded-md px-2 py-1.5 cursor-pointer"
    >
      Agregar nuevo usuario
    </button>
  );
}
