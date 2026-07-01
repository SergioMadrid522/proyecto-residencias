import { deleteAlert } from "@/helpers/alerts";
import { useState } from "react";
import toast from "react-hot-toast";

export function useEliminateUser() {
  const [loadingEliminate, setLoading] = useState(false);

  const handleEliminateSubmit = async (id: number) => {
    const apiURL = process.env.NEXT_PUBLIC_ELIMINATE_USER_API_URL;
    try {
      const deleteConfirmation = await deleteAlert();

      if (!deleteConfirmation) {
        toast.error("Se ha cancelado la creación de usuario");
        return;
      }

      if (!apiURL) return;

      setLoading(true);

      const res = await fetch(apiURL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        toast.error("No se pudo eliminar al usuario");
        return;
      }

      toast.success("Se eliminó el usuario correctamente");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Hubo un error al conectarse con el servidor");
      }
    } finally {
      setLoading(false);
    }
  };
  return {
    loadingEliminate,
    handleEliminateSubmit,
  };
}
