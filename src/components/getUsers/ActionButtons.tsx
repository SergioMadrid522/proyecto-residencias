"use client";
import { useEliminateUser } from "@/hooks/userEliminateUser";
import { GLOBAL } from "@/icons.data";
import { ActionProps } from "@/types/types";

export default function ActionButtons({ id }: ActionProps) {
  const { loading, handleSubmit } = useEliminateUser();
  const { editIcon, trashCanIcon } = GLOBAL;
  return (
    <div key={id} className="flex gap-5 items-center justify-center p-2">
      <button
        type="button"
        onClick={() => alert(`estas editando el usuario con id: ${id}`)}
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
          {editIcon()}
        </svg>
      </button>

      <button
        type="button"
        onClick={() => {
          handleSubmit(id);
        }}
        disabled={loading}
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
