import { useOpenModal } from "@/context/ModalContext";
import { createUserSchema } from "@/schemas/auth.schema";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function useEditUser() {
  const { modal } = useOpenModal();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState(0);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const id = modal?.type === "editUser" ? modal.user.id : 0;

  useEffect(() => {
    if (modal?.type === "editUser") {
      fetch(`/api/users/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setNombre(data[0].nombre || "");
          setEmail(data[0].email || "");
          setRol(data[0].rolId || 0);
        })
        .catch((e) => {
          console.error("error", e);
        });
    }
  }, [modal]);

  const handleEditSubmit = async (e: React.FormEvent) => {
    const apiURL = process.env.NEXT_PUBLIC_API_URL_EDIT_USER;
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
      if (!apiURL) {
        return;
      }
      setLoadingEdit(true);
      const res = await fetch(apiURL, {
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
    loadingEdit,
    handleEditSubmit,
  };
}
