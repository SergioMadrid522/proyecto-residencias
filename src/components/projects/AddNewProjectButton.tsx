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
          className="border rounded-md px-2 py-1.5 cursor-pointer"
        >
          Exportar a excel
        </button>
      )}

      <button
        onClick={() => {
          setModal({ type: "create-project" });
        }}
        className="border rounded-md px-2 py-1.5 cursor-pointer"
      >
        Agregar Nuevo Proyecto
      </button>
    </>
  );
}
