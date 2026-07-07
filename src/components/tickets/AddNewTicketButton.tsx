"use client";
import { useOpenModal } from "@/context/ModalContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AddNewTicketButton({
  activeRol,
}: {
  activeRol: string;
}) {
  const { setModal } = useOpenModal();

  const triggerDownloadExcelFile = () => {
    window.location.href = "/api/tickets/export";
  };

  return (
    <>
      {activeRol.toLowerCase() === "admin" && (
        <button
          onClick={triggerDownloadExcelFile}
          className="border rounded-md px-2 py-1.5 cursor-pointer"
        >
          Exportar a excel
        </button>
      )}

      <button
        onClick={() => {
          setModal({ type: "create-ticket" });
        }}
        className="border rounded-md px-2 py-1.5 cursor-pointer"
      >
        Crear nuevo ticket
      </button>
    </>
  );
}
