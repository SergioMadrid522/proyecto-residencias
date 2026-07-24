import { logoutAlert } from "@/helpers/alerts";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export function useLogout() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const apiURL = process.env.NEXT_PUBLIC_LOGOUT_API_URL;

  const handleLogout = async () => {
    const logoutConfirmation = await logoutAlert();
    if (!logoutConfirmation) return;
    if (!apiURL) return;

    setLoading(true);

    try {
      const res = await fetch(apiURL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "same-origin",
        cache: "no-cache",
      });

      if (!res.ok) {
        toast.error("Error al cerrar sesión");
        return;
      }
      toast.success("Se ha cerrado la sesión con éxito");
      window.location.href = "/";
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Ocurrió un error al conectarse con el servidor");
      }
    } finally {
      setLoading(false);
    }
  };
  return { loading, handleLogout };
}
