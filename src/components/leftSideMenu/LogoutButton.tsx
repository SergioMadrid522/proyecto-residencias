"use client";

import { useLogout } from "@/hooks/useLogout";

export default function LogoutButton() {
  const { loading, handleLogout } = useLogout();
  return (
    <button
      type="button"
      className="cursor-pointer"
      onClick={handleLogout}
      disabled={loading}
    >
      Cerrar Sesión
    </button>
  );
}
