import { FormField } from "@/components/form/FormField";
import { useCreateProject } from "@/hooks/useCreateProject";
import { GLOBAL } from "@/icons.data";

export default function CreateForm() {
  const {
    nombreProyecto,
    setNombreProyecto,
    descripcion,
    setDescripcion,
    loading,
    handleSubmit,
  } = useCreateProject();

  const { circleSpin } = GLOBAL;

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-2xl flex-col gap-5"
    >
      <FormField>
        <div>Nombre del proyecto</div>
        <input
          type="text"
          value={nombreProyecto || ""}
          onChange={(e) => setNombreProyecto(e.target.value)}
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
        <div className="text-[15px]">Descripción</div>
        <textarea
          value={descripcion || ""}
          rows={5}
          cols={20}
          onChange={(e) => setDescripcion(e.target.value)}
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
        ></textarea>
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
              Creando ticket
            </span>
          ) : (
            "Guardar"
          )}
        </button>
      </div>
    </form>
  );
}
