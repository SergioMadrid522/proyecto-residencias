"use client";
import { useOpenModal } from "@/context/ModalContext";

export default function AddNewUserButton() {
  const { setModal } = useOpenModal();

  return (
    <>
      <button
        onClick={() => {
          setModal({ type: "create-user" });
        }}
        className="
          flex items-center gap-2
          rounded-lg
          px-4 py-2.5
          text-sm font-medium
          text-black
          shadow-sm
          transition
          hover:bg-gray-200
          active:scale-95
          cursor-pointer
        "
      >
        Agregar nuevo usuario
      </button>
    </>
  );
}
