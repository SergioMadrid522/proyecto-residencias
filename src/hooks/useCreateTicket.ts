import { createTicketSchema } from "@/schemas/project.schema";
import { useState } from "react";
import toast from "react-hot-toast";

export function useCreateTicket() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [pasosReproducir, setPasosReproducir] = useState("");
  const [modulo, setModulo] = useState("");
  const [estado, setEstado] = useState("");
  const [prioridad, setPrioridad] = useState("");
  const [severidadIa, setSeveridadIa] = useState("");
  const [proyectoId, setProyectoId] = useState(0);
  const [usuarioAsignadoId, setUsuarioAsignadoId] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    const apiURL = process.env.NEXT_PUBLIC_API_URL_CREATE_TICKET;
    e.preventDefault();

    const result = createTicketSchema.safeParse({
      titulo,
      descripcion,
      pasosReproducir,
      modulo,
      estado,
      prioridad,
      severidadIa,
      proyectoId,
      usuarioAsignadoId,
    });

    if (!result.success) {
      const error = result.error.issues[0].message;
      toast.error(error);
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
        body: JSON.stringify({
          titulo,
          descripcion,
          pasosReproducir,
          modulo,
          estado,
          prioridad,
          severidadIa,
          proyectoId,
          usuarioAsignadoId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Error al crear el ticket");
        return;
      }

      setTitulo(data.titulo);
      setDescripcion(data.email);
      setPasosReproducir(data.password);
      setModulo(data.rol);
      setEstado(data.estado);
      setPrioridad(data.prioridad);
      setSeveridadIa(data.severidadIa);
      setProyectoId(data.proyectoId);
      setUsuarioAsignadoId(data.usuarioAsignadoId);

      toast.success("Se ha creado el ticket con éxito");
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

  return {
    titulo,
    setTitulo,
    descripcion,
    setDescripcion,
    pasosReproducir,
    setPasosReproducir,
    modulo,
    setModulo,
    estado,
    setEstado,
    prioridad,
    setPrioridad,
    severidadIa,
    setSeveridadIa,
    proyectoId,
    setProyectoId,
    usuarioAsignadoId,
    setUsuarioAsignadoId,
    loading,
    handleSubmit,
  };
}
