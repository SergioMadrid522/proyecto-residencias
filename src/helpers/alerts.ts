import Swal from "sweetalert2";

export async function logoutAlert() {
  const result = await Swal.fire({
    icon: "question",
    title: "¿Cerrar sesión?",
    text: "¿Estás seguro de que deseas cerrar tu sesión?",

    showCancelButton: true,

    cancelButtonText: "Seguir aquí",
    confirmButtonText: "Sí, cerrar sesión",

    confirmButtonColor: "#2563eb",
    cancelButtonColor: "#9ca3af",

    reverseButtons: true,
    focusCancel: true,
  });

  return result.isConfirmed;
}

export async function deleteAlert() {
  const result = await Swal.fire({
    icon: "warning",
    title: "¿Eliminar registro?",
    text: "Esta acción no se puede deshacer.",

    showCancelButton: true,

    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",

    confirmButtonColor: "#dc2626", // red-600
    cancelButtonColor: "#6b7280", // gray-500

    reverseButtons: true,
    focusCancel: true,

    customClass: {
      popup: "rounded-2xl",
      title: "text-2xl font-bold",
      confirmButton: "rounded-lg px-5 py-2",
      cancelButton: "rounded-lg px-5 py-2",
    },
  });

  return result.isConfirmed;
}
