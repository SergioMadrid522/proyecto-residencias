"use client";
import { useOpenModal } from "@/context/ModalContext";
import EditUserForm from "./EditUserForm";
import { GLOBAL } from "@/icons.data";

export default function EditUser() {
  const { modal, setModal } = useOpenModal();
  const isOpen = modal?.type === "edit-user";
  const { crossIcon: Icon } = GLOBAL;

  return (
    <>
      <div
        className={`
          fixed inset-0 z-40 bg-black/40 backdrop-blur-sm
          transition-opacity
          ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      ></div>
      <div
        className={`
          fixed inset-0 z-50 m-auto
          w-[90%] max-w-3xl
          h-[85%]
          rounded-2xl
          bg-white
          shadow-2xl
          transition-all duration-300
          overflow-hidden
          ${
            isOpen
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }
        `}
      >
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Editar Usuario
            </h2>
            <p className="text-sm text-gray-500">
              Edita el perfil de un usuario existente.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setModal(null)}
            className="
              rounded-lg p-2
              text-gray-500
              hover:bg-gray-100
              hover:text-gray-800
              transition
              cursor-pointer
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <Icon />
            </svg>
          </button>
        </div>

        <div className="h-[calc(100%-80px)] overflow-y-auto p-6">
          <EditUserForm />
        </div>
      </div>
    </>
  );
}
