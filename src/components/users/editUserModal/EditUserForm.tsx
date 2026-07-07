import { FormField } from "@/components/form/FormField";
import { useEditUser } from "@/hooks/useEditUser";
import { GLOBAL } from "@/icons.data";
export default function EditUserForm() {
  const {
    nombre,
    setNombre,
    email,
    setEmail,
    password,
    setPassword,
    status,
    setStatus,
    rol,
    setRol,
    loadingEdit,
    isFetching,
    handleEditSubmit,
  } = useEditUser();

  const { circleSpin } = GLOBAL;

  if (isFetching) {
    return (
      <div className="flex w-full h-full justify-center items-center">
        <h2 className="p-4">Cargando datos...</h2>
      </div>
    );
  }
  return (
    <div>
      <h2 className="p-4">Editar usuario</h2>
      <form
        onSubmit={handleEditSubmit}
        className="flex flex-col justify-center w-[50%] h-full gap-5 m-auto"
      >
        <FormField>
          <div className="text-[15px]">Nombre del usuario</div>
          <input
            type="text"
            value={nombre || ""}
            onChange={(e) => setNombre(e.target.value)}
            className="outline-1 rounded-sm px-2 py-1"
          />
        </FormField>

        <FormField>
          <div className="text-[15px]">Email</div>
          <input
            type="email"
            value={email || ""}
            onChange={(e) => setEmail(e.target.value)}
            className="outline-1 rounded-sm px-2 py-1"
          />
        </FormField>

        <FormField>
          <div className="text-[15px]">Contraseña</div>
          <input
            type="password"
            value={password || ""}
            onChange={(e) => setPassword(e.target.value)}
            className="outline-1 rounded-sm px-2 py-1"
          />
        </FormField>

        <FormField>
          <div className="text-[15px]">¿Sigue Está activo?</div>
          <select
            name=""
            id=""
            value={status || 0}
            onChange={(e) => {
              const value = Number(e.target.value);
              setStatus(value);
            }}
            className="outline-1 rounded-sm px-2 py-1"
          >
            <option value="0">Sí</option>
            <option value="1">No</option>
          </select>
        </FormField>

        <FormField>
          <div className="text-[15px]">Rol</div>
          <select
            name=""
            id=""
            value={rol || 0}
            onChange={(e) => {
              const value = Number(e.target.value);
              setRol(value);
            }}
            className="outline-1 rounded-sm px-2 py-1"
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
            disabled={loadingEdit}
            className={`w-full py-2.5 px-4 mt-2 text-white font-medium rounded-lg transition-all duration-200 flex justify-center items-center ${
              loadingEdit
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 hover:shadow-md active:transform active:scale-[0.98] cursor-pointer"
            }`}
          >
            {loadingEdit ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  {circleSpin()}
                </svg>
                Editando usuario
              </span>
            ) : (
              "Guardar"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
