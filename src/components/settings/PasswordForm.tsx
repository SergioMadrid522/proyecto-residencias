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
    <form onSubmit={handleSubmit}>
      <div className="flex gap-5 pb-2">
        <div>
          <p>Nombre</p>
          <input
            type="text"
            className="outline rounded-sm p-1 bg-black/10"
            value={user?.nombre}
            readOnly
          />
        </div>
        <div>
          <p>Email</p>
          <input
            type="text"
            className="outline rounded-sm select-none bg-black/10 p-1"
            value={user?.email}
            readOnly
          />
        </div>
      </div>

      <div className="flex gap-5 pt-2">
        <div>
          <p>Contraseña actual</p>
          <input
            type="password"
            className="outline rounded-sm p-1"
            value={actualPassword || ""}
            onChange={(e) => setActualPassword(e.target.value)}
          />
        </div>
        <div>
          <p>Nueva Contraseña</p>
          <input
            type="password"
            className="outline rounded-sm p-1"
            value={newPassword || ""}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-4">
        <button
          type="submit"
          className={`outline rounded-md p-1 cursor-pointer ${loading ? "g-blue-400 cursor-not-allowed" : ""}`}
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <SpinIcon />
              </svg>
              Guardando Cambios...
            </span>
          ) : (
            "Guardar Cambios"
          )}
        </button>
      </div>
    </form>
  );
}
