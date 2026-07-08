import { useEffect, useState } from "react";
import { useOpenModal } from "@/context/ModalContext";
import toast from "react-hot-toast";
import { projectSchema } from "@/schemas/project.schema";
import getSession from "@/helpers/getSession";
import { getStatusNumber } from "@/utils/getFunctions";

export function useEditProject() {
  const { modal } = useOpenModal();
  const apiURL = process.env.NEXT_PUBLIC_PROJECT_API_URL;

  if (!apiURL) throw new Error("NEXT_PUBLIC_PROJECT_API_URL no está definida");

  const [nombreProyecto, setNombreProyecto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [status, setStatus] = useState<number>(0);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const isEditModal = modal?.type === "edit-project";
  const projectId = isEditModal ? modal.project.id : null;

  useEffect(() => {
    if (!isEditModal || projectId === null) return;

    setIsFetching(true);

    fetch(`${apiURL}/${projectId}`)
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo obtener el ticket");

        return res.json();
      })
      .then((proyectoData) => {
        const statusNumber = getStatusNumber(String(proyectoData.activo));

        setNombreProyecto(proyectoData.nombreProyecto || "");
        setDescripcion(proyectoData.descripcion || "");
        setStatus(statusNumber || 0);
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
  }, [isEditModal, projectId]);

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = projectSchema.safeParse({
      nombreProyecto,
      descripcion,
      status,
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
          id: projectId,
          nombreProyecto,
          descripcion,
          status,
        }),
      });

      if (!res.ok) {
        throw new Error("No se pudo editar el proyecto");
      }

      toast.success("Se ha modificado el proyecto con éxito");
      setNombreProyecto("");
      setDescripcion("");
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
    nombreProyecto,
    setNombreProyecto,
    descripcion,
    setDescripcion,
    status,
    setStatus,
    loadingEdit,
    isFetching,
    handleEditSubmit,
  };
}
