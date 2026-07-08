"use client";
import { useEditPassword } from "@/hooks/useEditPassword";
import { GLOBAL } from "@/icons.data";
import { UserSettingsProps } from "@/types";

export default function PasswordForm({ user }: UserSettingsProps) {
  const {
    loading,
    setActualPassword,
    actualPassword,
    newPassword,
    setNewPassword,
    handleSubmit,
  } = useEditPassword(user?.id!);
  const { circleSpin: SpinIcon } = GLOBAL;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Nombre
          </label>

          <input
            type="text"
            value={user?.nombre}
            readOnly
            className="w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-gray-600"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Correo electrónico
          </label>

          <input
            type="text"
            value={user?.email}
            readOnly
            className="w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-gray-600"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Contraseña actual
          </label>

          <input
            type="password"
            value={actualPassword || ""}
            onChange={(e) => setActualPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Nueva contraseña
          </label>

          <input
            type="password"
            value={newPassword || ""}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className={`flex items-center justify-center rounded-lg px-5 py-2.5 font-medium text-white transition-all duration-200 ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "cursor-pointer bg-blue-600 hover:bg-blue-700 hover:shadow-md active:scale-95"
          }`}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg
                className="h-5 w-5 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <SpinIcon />
              </svg>
              Guardando cambios...
            </span>
          ) : (
            "Guardar cambios"
          )}
        </button>
      </div>
    </form>
  );
}
