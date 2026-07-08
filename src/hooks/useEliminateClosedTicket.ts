import { useState } from "react";
import toast from "react-hot-toast";

export function useEliminateClosedTickets() {
  const [loadingClosed, setLoadingClosed] = useState(false);

  const apiURL = process.env.NEXT_PUBLIC_ARCHIVE_CLOSED_TICKET_API_URL;
  console.log(apiURL);

  if (!apiURL)
    throw new Error(
      "NEXT_PUBLIC_ARCHIVE_CLOSED_TICKET_API_URL no está definida",
    );

  const handleEliminateClosedSubmit = async () => {
    try {
      setLoadingClosed(true);

      const res = await fetch(apiURL, { method: "PUT" });

      if (!res.ok) {
        toast.error("No se pudo conectar a la API");
        return;
      }
      toast.success("Se eliminaron los tickets correctamente");
    } catch (error) {
    } finally {
      setLoadingClosed(false);
    }
  };

  return {
    loadingClosed,
    handleEliminateClosedSubmit,
  };
}
