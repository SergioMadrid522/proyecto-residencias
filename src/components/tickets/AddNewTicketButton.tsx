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
          className="
            flex items-center gap-2
            rounded-lg
            px-4 py-2.5
            text-sm font-medium
            text-black
            shadow-sm
            transition
            hover:bg-gray-200
            active:scale-95
            cursor-pointer"
        >
          Exportar a excel
        </button>
      )}
      {!isDev && (
        <button
          onClick={() => {
            setModal({ type: "create-ticket" });
          }}
          className="
            flex items-center gap-2
            rounded-lg
            px-4 py-2.5
            text-sm font-medium
            text-black
            shadow-sm
            transition
            hover:bg-gray-200
            active:scale-95
            cursor-pointer"
        >
          Crear nuevo ticket
        </button>
      )}
    </>
  );
}
