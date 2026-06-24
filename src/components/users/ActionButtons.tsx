"use client";
import { useEliminateUser } from "@/hooks/userEliminateUser";
import { GLOBAL } from "@/icons.data";
import { ActionProps } from "@/types/types";
import { useOpenModal } from "@/context/ModalContext";

export default function ActionButtons({ id }: ActionProps) {
  const { modal, setModal } = useOpenModal();
  const { loadingEliminate, handleEliminateSubmit } = useEliminateUser();
  const { trashCanIcon, pencilIcon } = GLOBAL;

  return (
    <div key={id} className="flex gap-5 items-center justify-center p-2">
      <button
        type="button"
        onClick={() => setModal({ type: "editUser", user: { id } })}
        disabled={loadingEliminate}
        className="cursor-pointer"
        aria-label="Editar usuario"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          {pencilIcon()}
        </svg>
      </button>

      <button
        type="button"
        onClick={() => handleEliminateSubmit(id)}
        disabled={loadingEliminate}
        className="cursor-pointer"
        aria-label="Eliminar usuario"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d={trashCanIcon} />
        </svg>
      </button>
    </div>
  );
}
