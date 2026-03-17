"use client";

import { useLogin } from "@/hooks/useLogin";
import { GLOBAL } from "@/data";

export default function LoginForm() {
  const { email, setEmail, password, setPassword, loading, handleSubmit } =
    useLogin();
  const { circleIcon } = GLOBAL;
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 border border-white/75"
    >
      <div className="flex flex-col gap-1.5">
        <div className="text-[15px]">Correo</div>
        <input
          type="email"
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2.5 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="text-[15px]">Contraseña</div>
        <input
          type="password"
          value={password || ""}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2.5 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2.5 px-4 mt-2 text-white font-medium rounded-lg transition-all duration-200 flex justify-center items-center ${
          loading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 hover:shadow-md active:transform active:scale-[0.98]"
        }`}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d={circleIcon}
              ></path>
            </svg>
            Validando...
          </span>
        ) : (
          "Iniciar Sesión"
        )}
      </button>
    </form>
  );
}
