import { useOpenModal } from "@/context/ModalContext";
import { createUserSchema } from "@/schemas/auth.schema";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function useEditUser(id?: number) {
  const { modal } = useOpenModal();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState(0);
  const [loadingEdit, setLoadingEdit] = useState(false);

  useEffect(() => {
    if (modal?.type === "edit") {
      fetch(`/api/user/${modal.user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setNombre(data.nombre || "");
          setEmail(data.email || "");
          setRol(data.rol || 0);
        });
    }
  }, [modal]);

  const handleEditSubmit = async (e: React.FormEvent) => {
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
