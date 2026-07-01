import { useOpenModal } from "@/context/ModalContext";
import { createUserSchema } from "@/schemas/auth.schema";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function useEditUser() {
  const { modal } = useOpenModal();
  const id = modal?.type === "edit-user" ? modal.user.id : 0;

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState(0);

  const getUserApiURL = process.env.NEXT_PUBLIC_GET_USER_BY_ID_API_URL;
  const EditUserApiURL = process.env.NEXT_PUBLIC_EDIT_USER_API_URL;

  if (!getUserApiURL)
    throw new Error("NEXT_PUBLIC_GET_USER_BY_ID_API_URL no está definida");
  if (!EditUserApiURL)
    throw new Error("NEXT_PUBLIC_EDIT_USER_API_URL no está definida");

  const [loadingEdit, setLoadingEdit] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (modal?.type === "edit-user") {
      setIsFetching(true);

      fetch(`${getUserApiURL}/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setNombre(data[0].nombre || "");
          setEmail(data[0].email || "");
          setRol(data[0].rolId || 0);

          setIsFetching(false);
        })
        .catch((e) => {
          console.error("error", e);
          toast.error("Error al traer la información del usuario.");
        })
        .finally(() => setIsFetching(false));
    }
  }, [modal]);

  const handleEditSubmit = async (e: React.FormEvent) => {
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
      return;
    }

    try {
      setLoadingEdit(true);

      const res = await fetch(EditUserApiURL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, nombre, email, password, rol }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Error al editar el usuario");
        return;
      }
      setNombre(data.nombre);
      setEmail(data.email);
      setPassword(data.password);
      setRol(data.rol);

      toast.success("Se ha modificado el usuario con éxito");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Ocurrió un error al conectarse con el servidor");
      }
    } finally {
      setLoadingEdit(false);
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
    isFetching,
    loadingEdit,
    handleEditSubmit,
  };
}
