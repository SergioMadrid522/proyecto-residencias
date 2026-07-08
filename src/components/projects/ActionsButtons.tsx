"use client";
import { useOpenModal } from "@/context/ModalContext";
import { useEliminateProject } from "@/hooks/useEliminateProject";

import { GLOBAL } from "@/icons.data";
import { ActionProps } from "@/types/types";

export default function ActionButtons({ id }: ActionProps) {
  const { modal, setModal } = useOpenModal();
  const { loadingEliminate, handleEliminateSubmit } = useEliminateProject();
  const { trashCanIcon: DeleteIcon, pencilIcon: EditIcon } = GLOBAL;

  return (
    <div key={id} className="flex gap-5 items-center justify-center p-2">
      <button
        type="button"
        onClick={() => setModal({ type: "edit-project", project: { id } })}
        className="cursor-pointer"
        aria-label="Editar proyecto"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <EditIcon />
        </svg>
      </button>

      <button
        type="button"
        onClick={() => {
          handleEliminateSubmit(id);
        }}
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
          <DeleteIcon />
        </svg>
      </button>
    </div>
  );
}
