"use client";
import { useOpenModal } from "@/context/ModalContext";

export default function AddNewTicketButton() {
  const { modal, setModal } = useOpenModal();

  return (
    <button
      onClick={() => {
        setModal({ type: "create" });
      }}
      className="border rounded-md px-2 py-1.5 cursor-pointer"
    >
      Crear nuevo ticket
    </button>
  );
}
