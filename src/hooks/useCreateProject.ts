import { projectSchema } from "@/schemas/project.schema";
import { useState } from "react";
import toast from "react-hot-toast";

export function useCreateProject() {
  const [nombreProyecto, setNombreProyecto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [loading, setLoading] = useState(false);
  const apiURL = process.env.NEXT_PUBLIC_PROJECT_API_URL;

  if (!apiURL) throw new Error("NEXT_PUBLIC_PROJECT_API_URL no está definida");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = projectSchema.safeParse({
      nombreProyecto,
      descripcion,
    });

    if (!result.success) {
      const error = result.error.issues[0].message;
      toast.error(error);
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(apiURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombreProyecto,
          descripcion,
          activo: true,
        }),
      });

      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        toast.error(data.error || "Error al crear el proyecto");
        return;
      }

      setNombreProyecto(data.nombreProyecto);
      setDescripcion(data.descripcion);

      toast.success("Se ha agregado el proyecto con éxito");
    } catch (error) {
      if (error instanceof Error) {
        /* toast.error(error.message); */
        console.error(error);
      } else {
        toast.error("Ocurrió un error al conectarse con el servidor");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    nombreProyecto,
    setNombreProyecto,
    descripcion,
    setDescripcion,
    loading,
    handleSubmit,
  };
}
