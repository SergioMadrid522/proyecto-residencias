"use client";
import { useOpenModal } from "@/context/ModalContext";
import { useRolMapper } from "@/hooks/useRolMapper";
import { getUsers } from "@/utils/getFunctions";
import EditTicket from "./editTicketModal/EditTicket";
import { EditButtonProps } from "@/types";

export default function EditButton({ id, user, rol }: EditButtonProps) {
  const { setModal } = useOpenModal();

  return (
    <>
      <button
        type="button"
        onClick={() => setModal({ type: "edit-ticket", ticket: { id } })}
        className="border rounded-md px-2 py-1.5 cursor-pointer"
        aria-label="Editar Ticket"
      >
        Editar Ticket
      </button>

      <EditTicket user={user} rol={rol} />
    </>
  );
}
