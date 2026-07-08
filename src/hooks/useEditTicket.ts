import { useEffect, useState } from "react";
import { useOpenModal } from "@/context/ModalContext";
import toast from "react-hot-toast";
import { createTicketSchema } from "@/schemas/project.schema";
import getSession from "@/helpers/getSession";

export function useEditTicket() {
  const { modal } = useOpenModal();
  const apiURL = process.env.NEXT_PUBLIC_TICKET_API_URL;

  if (!apiURL) throw new Error("NEXT_PUBLIC_TICKET_API_URL no está definida");

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [pasosReproducir, setPasosReproducir] = useState("");
  const [modulo, setModulo] = useState("");
  const [estado, setEstado] = useState<string>("");
  const [prioridad, setPrioridad] = useState("");
  const [severidadIa, setSeveridadIa] = useState("");
  const [proyectoId, setProyectoId] = useState(0);
  const [usuarioAsignadoId, setUsuarioAsignadoId] = useState<number>(0);

  const [loadingEdit, setLoadingEdit] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const isEditModal = modal?.type === "edit-ticket";
  const ticketId = isEditModal ? modal.ticket.id : null;

  useEffect(() => {
    if (!isEditModal || ticketId === null) return;
    setIsFetching(true);

    fetch(`${apiURL}/${ticketId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("No se pudo obtener el ticket");
        }
        return res.json();
      })
      .then((data) => {
        const timeline = Object.values(data.ticket.historial);
        const timelineData = Object(timeline[timeline.length - 1]);
        const userAsiged = timelineData.usuarioId;
        const lastStatus = timelineData.estadoNuevo;

        setTitulo(data.ticket.titulo || "");
        setDescripcion(data.ticket.descripcion || "");
        setPasosReproducir(data.ticket.pasosReproducir || "");
        setModulo(data.ticket.modulo || "");
        setEstado(lastStatus || data.ticket.estado || "");
        setPrioridad(data.ticket.prioridad || "");
        setSeveridadIa(data.ticket.severidadIa || "");
        setProyectoId(data.ticket.proyectoId || 0);
        setUsuarioAsignadoId(data.ticket.usuarioAsignadoId || userAsiged);
      })
      .catch((error) => {
        if (error instanceof Error) {
          console.error("Error: ", error);
          toast.error(error.message);
        } else {
          console.error("Error: ", error);
          toast.error("Ocurrió un error al conectarse con el servidor");
        }
      })
      .finally(() => setIsFetching(false));
  }, [isEditModal, ticketId]);

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = await getSession();
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
      setLoadingEdit(true);

      const res = await fetch(apiURL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: ticketId,
          titulo,
          descripcion,
          pasosReproducir,
          modulo,
          estado,
          prioridad,
          severidadIa,
          proyectoId,
          usuarioAsignadoId,
          usuarioReporta: data?.userId,
        }),
      });

      if (!res.ok) {
        throw new Error("No se pudo editar el ticket");
      }

      toast.success("Se ha modificado el ticket con éxito");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        console.error("Error: ", error);
        toast.error("Ocurrió un error al conectarse con el servidor");
      }
    } finally {
      setLoadingEdit(false);
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
    loadingEdit,
    isFetching,
    handleEditSubmit,
  };
}
