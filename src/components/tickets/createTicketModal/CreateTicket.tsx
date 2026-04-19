"use client";

import { GLOBAL } from "@/icons.data";
import CreateTicketForm from "./CreateTicketForm";
import { useOpenModal } from "@/context/ModalContext";
import { Username } from "@/types";

export default function CreateTicket({ user }: Username) {
  const { modal, setModal } = useOpenModal();
  const isOpen = modal?.type === "create";

  const { crossIcon } = GLOBAL;

  return (
    <>
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm ${isOpen ? "block" : "hidden"} `}
      ></div>
      <div
        className={`absolute inset-0 m-auto w-[70%] h-[80%] bg-white border rounded-md transition-all duration-300 p-4 overflow-y-scroll
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

        <div>
          <h2 className="p-4">Crear Ticket</h2>

          <CreateTicketForm user={user} />
        </div>
      </div>
    </>
  );
}
