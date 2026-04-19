"use client";

import { useOpenModal } from "@/context/ModalContext";
import CreateUserForm from "./CreateUserForm";
import { GLOBAL } from "@/icons.data";

export default function CreateUser() {
  const { modal, setModal } = useOpenModal();
  const isOpen = modal?.type === "create";

  const { crossIcon } = GLOBAL;

  return (
    <>
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm ${isOpen ? "block" : "hidden"} `}
      ></div>
      <div
        className={`absolute inset-0 m-auto w-[50%] h-[50%] bg-white border rounded-md transition-all duration-300 overflow-hidden
        ${isOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}
      >
        <div className="absolute right-0 p-2.5">
          <button
            type="button"
            onClick={() => setModal(null)}
            className="flex justify-end items-center cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="27"
              height="27"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d={crossIcon} />
            </svg>
          </button>
        </div>

        <CreateUserForm />
      </div>
    </>
  );
}
