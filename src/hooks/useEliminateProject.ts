import { deleteAlert } from "@/helpers/alerts";
import { useState } from "react";
import toast from "react-hot-toast";

export function useEliminateProject() {
  const [loadingEliminate, setLoadingEliminate] = useState(false);

  const handleEliminateSubmit = async (id: number) => {
    const apiURL = process.env.NEXT_PUBLIC_PROJECT_API_URL;
    if (!apiURL)
      throw new Error("NEXT_PUBLIC_PROJECT_API_URL no está definida");

    try {
      const deleteConfirmation = await deleteAlert();

      if (!deleteConfirmation) {
        toast.error("Se ha cancelado la eliminación del proyecto");
        return;
      }

      setLoadingEliminate(true);

      const res = await fetch(apiURL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        toast.error("No se pudo eliminar el proyecto");
        return;
      }

      toast.success("Se eliminó el proyecto correctamente");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Hubo un error al conectarse con el servidor");
      }
    } finally {
      setLoadingEliminate(false);
    }
  };
  return {
    loadingEliminate,
    handleEliminateSubmit,
  };
}
