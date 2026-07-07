"use client";
import { useOpenModal } from "@/context/ModalContext";

export default function AddNewProjectButton({
  activeRol,
}: {
  activeRol: string;
}) {
  const { setModal } = useOpenModal();

  const triggerDownloadExcelFile = () => {
    window.location.href = "";
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
