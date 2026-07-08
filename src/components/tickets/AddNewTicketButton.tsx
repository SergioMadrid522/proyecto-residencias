"use client";
import { useOpenModal } from "@/context/ModalContext";

export default function AddNewTicketButton({
  activeRol,
}: {
  activeRol: string;
}) {
  const { setModal } = useOpenModal();
  const exportApiUrl = process.env.NEXT_PUBLIC_EXPORT_TICKETS_API_URL;

  if (!exportApiUrl)
    throw new Error("NEXT_PUBLIC_EXPORT_TICKETS_API_URL no esta definida");

  const isAdmin = activeRol.toLowerCase() === "admin";
  const isDev = activeRol.toLowerCase() === "dev";

  const triggerDownloadExcelFile = () => {
    window.location.href = exportApiUrl;
  };

  return (
    <>
      {isAdmin && (
        <button
          onClick={triggerDownloadExcelFile}
          className="border rounded-md px-2 py-1.5 cursor-pointer"
        >
          Exportar a excel
        </button>
      )}
      {!isDev && (
        <button
          onClick={() => {
            setModal({ type: "create-ticket" });
          }}
          className="border rounded-md px-2 py-1.5 cursor-pointer"
        >
          Crear nuevo ticket
        </button>
      )}
    </>
  );
}
