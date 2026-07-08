import { FormField } from "@/components/form/FormField";
import { useCreateUser } from "@/hooks/useCreateUser";
import { GLOBAL } from "@/icons.data";
export default function CreateUserForm() {
  const {
    nombre,
    setNombre,
    email,
    setEmail,
    password,
    setPassword,
    rol,
    setRol,
    loading,
    handleSubmit,
  } = useCreateUser();
  const { circleSpin } = GLOBAL;
  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-2xl flex-col gap-5 "
    >
      <FormField>
        <div className="text-[15px]">Nombre del usuario</div>
        <input
          type="text"
          value={nombre || ""}
          onChange={(e) => setNombre(e.target.value)}
          className="
            w-full
            rounded-lg
            border
            border-gray-400
            px-3
            py-2
            text-sm
            text-gray-700
            outline-none
            transition
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-100
          "
        />
      </FormField>

      <FormField>
        <div className="text-[15px]">Email</div>
        <input
          type="email"
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
          className="
            w-full
            rounded-lg
            border
            border-gray-400
            px-3
            py-2
            text-sm
            text-gray-700
            outline-none
            transition
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-100
          "
        />
      </FormField>

      <FormField>
        <div className="text-[15px]">Contraseña</div>
        <input
          type="password"
          value={password || ""}
          onChange={(e) => setPassword(e.target.value)}
          className="
            w-full
            rounded-lg
            border
            border-gray-400
            px-3
            py-2
            text-sm
            text-gray-700
            outline-none
            transition
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-100
          "
        />
      </FormField>

      <FormField>
        <div className="text-[15px]">Rol</div>
        <select
          name=""
          id=""
          value={rol || ""}
          onChange={(e) => {
            const value = Number(e.target.value);
            setRol(value);
          }}
          className="
            w-full
            rounded-lg
            border
            border-gray-400
            px-3
            py-2
            text-sm
            text-gray-700
            outline-none
            transition
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-100
          "
        >
          <option value="">Seleciona un rol</option>
          <option value="1">Admin</option>
          <option value="2">Desarrollador</option>
          <option value="3">Tester</option>
        </select>
      </FormField>

      <div className="flex items-center justify-center">
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2.5 px-4 mt-2 text-white font-medium rounded-lg transition-all duration-200 flex justify-center items-center ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 hover:shadow-md active:transform active:scale-[0.98] cursor-pointer"
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
                {circleSpin()}
              </svg>
              Creando usuario
            </span>
          ) : (
            "Guardar"
          )}
        </button>
      </div>
    </form>
  );
}
