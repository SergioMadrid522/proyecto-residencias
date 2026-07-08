"use client";
import { useOpenModal } from "@/context/ModalContext";
import EditTicket from "./editTicketModal/EditTicket";
import { EditButtonProps } from "@/types";

export default function EditButton({
  id,
  user,
  rol,
  projects,
}: EditButtonProps) {
  const { setModal } = useOpenModal();

  return (
    <>
      <button
        type="button"
        onClick={() => setModal({ type: "edit-ticket", ticket: { id } })}
        aria-label="Editar Ticket"
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
            cursor-pointer"
      >
        Editar Ticket
      </button>

      <EditTicket user={user} rol={rol} projects={projects} />
    </>
  );
}
