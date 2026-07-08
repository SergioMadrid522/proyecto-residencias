import { deleteAlert } from "@/helpers/alerts";
import { useState } from "react";
import toast from "react-hot-toast";

export function useEliminateTicket() {
  const [loadingEliminate, setLoadingEliminate] = useState(false);

  const handleEliminateSubmit = async (id: number) => {
    const apiURL = process.env.NEXT_PUBLIC_DELETE_TICKET_API_URL;

    if (!apiURL)
      throw new Error("NEXT_PUBLIC_DELETE_TICKET_API_URL no está definida");

    try {
      const deleteConfirmation = await deleteAlert();

      if (!deleteConfirmation) {
        toast.error("Se ha cancelado la eliminación del ticket");
        return;
      }

      setLoadingEliminate(true);

      const res = await fetch(apiURL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        toast.error("No se pudo eliminar el ticket");
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
