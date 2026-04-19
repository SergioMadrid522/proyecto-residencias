"use client";
import { useOpenModal } from "@/context/ModalContext";

export default function AddNewUserButton() {
  const { open, setOpen } = useOpenModal();

  return (
    <button
      onClick={() => {
        setOpen(!open);
        console.log(open);
      }}
      className="border rounded-md px-2 py-1.5 cursor-pointer"
    >
      Agregar nuevo usuario
    </button>
  );
}
