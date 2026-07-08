"use client";
import { GLOBAL } from "@/icons.data";
import { ModalState } from "@/types";

export default function CloseModalButton({
  setModal,
}: {
  setModal: React.Dispatch<React.SetStateAction<ModalState>>;
}) {
  const { crossIcon: Icon } = GLOBAL;
  return (
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
        <Icon />
      </svg>
    </button>
  );
}
