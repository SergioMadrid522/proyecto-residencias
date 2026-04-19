import { deleteAlert } from "@/helpers/alerts";
import { useState } from "react";
import toast from "react-hot-toast";

export function useEliminateTicket() {
  const [loadingEliminate, setLoadingEliminate] = useState(false);

  const handleEliminateSubmit = async (id: number) => {
    const apiURL = process.env.NEXT_PUBLIC_API_URL_ELIMINATE_TICKET;
    try {
      const deleteConfirmation = await deleteAlert();

      if (!deleteConfirmation) {
        toast.error("Se ha cancelado la creación del ticket");
        return;
      }
      if (!apiURL) return;

      setLoadingEliminate(true);

      const res = await fetch(apiURL, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        toast.error("No se pudo eliminar el usuario");
        return;
      }

      toast.success("Se eliminó el ticket correctamente");
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
