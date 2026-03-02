"use client";

export default function ProfileSection() {
  return (
    <div className="text-center">
      <p>Fabian A. | Admin</p>

      <button
        type="button"
        className="cursor-pointer"
        onClick={() => alert("Cerrando sesión")}
      >
        Cerrar Sesión
      </button>
    </div>
  );
}
