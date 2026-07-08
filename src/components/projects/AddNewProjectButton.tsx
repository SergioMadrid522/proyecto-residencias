"use client";
import { useOpenModal } from "@/context/ModalContext";

export default function AddNewProjectButton({
  activeRol,
}: {
  activeRol: string;
}) {
  const { setModal } = useOpenModal();
  const exportApiUrl = process.env.NEXT_PUBLIC_EXPORT_PROJECTS_API_URL;

  if (!exportApiUrl)
    throw new Error("NEXT_PUBLIC_EXPORT_PROJECTS_API_URL no esta definida");

  const triggerDownloadExcelFile = () => {
    window.location.href = exportApiUrl;
  };

  return (
    <>
      {activeRol.toLowerCase() === "admin" && (
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

      <button
        onClick={() => {
          setModal({ type: "create-project" });
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
        Agregar Nuevo Proyecto
      </button>
    </>
  );
}
