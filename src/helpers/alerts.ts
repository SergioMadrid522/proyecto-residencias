import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export async function logoutAlert() {
  const result = await Swal.fire({
    title: "Estás a punto de cerrar sesión!",
    text: "Estás seguro?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, cerrar sesión",
    cancelButtonText: "Cancelar",
  });
  return result.isConfirmed;
}

export async function deleteAlert() {
  const result = await Swal.fire({
    title: "Estás seguro?",
    text: "No podrás revertir esta acción!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, borrar",
  });
  return result.isConfirmed;
}
