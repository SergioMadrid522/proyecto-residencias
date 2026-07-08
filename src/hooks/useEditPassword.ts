import { useState } from "react";
import toast from "react-hot-toast";

export function useEditPassword(userId: number) {
  const [actualPassword, setActualPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const apiURL = process.env.NEXT_PUBLIC_USERS_API_URL;
  if (!apiURL)
    throw new Error("NEXT_PUBLIC_USERS_API_URL no está definida");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(`${apiURL}/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ actualPassword, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        const error = Object.values(data.errors!).flat()[0];

        if (typeof data.errors === "string") {
          toast.error(data.errors);
        } else {
          toast.error(error as string);
        }
        return;
      }

      toast.success("Se ha modificado tus credenciales.");
      setActualPassword("");
      setNewPassword("");
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        toast.error(error.message);
      } else {
        console.error("Error: ", error);
        toast.error("Ocurrió un error al conectarse con el servidor");
      }
    } finally {
      setLoading(false);
    }
  };
  return {
    loading,
    actualPassword,
    setActualPassword,
    newPassword,
    setNewPassword,
    handleSubmit,
  };
}
