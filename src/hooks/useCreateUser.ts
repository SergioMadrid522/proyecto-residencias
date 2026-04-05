import { createUserSchema } from "@/schemas/auth.schema";
import { useState } from "react";
import toast from "react-hot-toast";

export function useCreateUser() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    const apiURL = process.env.NEXT_PUBLIC_API_URL_REGISTER;
    e.preventDefault();
    const result = createUserSchema.safeParse({
      nombre,
      email,
      password,
      rol,
    });
    if (!result.success) {
      const error = result.error.issues[0].message;
      toast.error(error);
      console.error(error);
      return;
    }

    try {
      if (!apiURL) {
        return;
      }
      setLoading(true);

      const res = await fetch(apiURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password, rol }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Error al crear el usuario");
        return;
      }
      setNombre(data.nombre);
      setEmail(data.email);
      setPassword(data.password);
      setRol(data.rol);

      toast.success("Se ha creado el usuario con éxito");
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Ocurrió un error al conectarse con el servidor");
      }
    } finally {
      setLoading(false);
    }
  };
  return {
    nombre,
    setNombre,
    email,
    setEmail,
    password,
    setPassword,
    rol,
    setRol,
    loading,
    handleSubmit,
  };
}
