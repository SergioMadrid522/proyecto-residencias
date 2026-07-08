"use client";
import { useLogout } from "@/hooks/useLogout";

export default function LogoutButton() {
  const { loading, handleLogout } = useLogout();
  return (
    <button
      type="button"
      className="
        cursor-pointer
        mt-3 flex w-full items-center justify-center gap-2
        rounded-lg border border-gray-200
        px-4 py-2
        text-sm font-medium text-gray-600
        transition
        hover:bg-red-50 hover:text-red-600
        disabled:cursor-not-allowed disabled:opacity-50
      "
      onClick={handleLogout}
      disabled={loading}
    >
      Cerrar Sesión
    </button>
  );
}
