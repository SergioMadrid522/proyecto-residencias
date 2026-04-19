import { deleteUser } from "@/helpers/alerts";
import { useState } from "react";
import toast from "react-hot-toast";

export function useEliminateUser() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (id: number) => {
    const apiURL = process.env.NEXT_PUBLIC_API_URL_ELIMINATE_USER;
    try {
      const deleteConfirmation = await deleteUser();
      if (!deleteConfirmation) {
        toast.error("Se ha cancelado la creación de usuario");
        return;
      }
      if (!apiURL) return;
      setLoading(true);
      const res = await fetch(apiURL, {
        method: "DELETE",
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
    loading,
    handleSubmit,
  };
}
