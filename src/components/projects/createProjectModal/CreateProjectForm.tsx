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
      className="flex flex-col justify-center w-[80%] h-full gap-5 m-auto p-4 bg-white"
    >
      <FormField>
        <div className="text-[15px]">Titulo del ticket</div>
        <input
          type="text"
          value={nombreProyecto || ""}
          onChange={(e) => setNombreProyecto(e.target.value)}
          className="outline-1 rounded-sm px-2 py-1"
        />
      </FormField>

      <FormField>
        <div className="text-[15px]">Descripción</div>
        <textarea
          value={descripcion || ""}
          rows={5}
          cols={20}
          onChange={(e) => setDescripcion(e.target.value)}
          className="outline-1 rounded-sm px-2 py-1"
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
              Agregando proyecto...
            </span>
          ) : (
            "Guardar"
          )}
        </button>
      </div>
    </form>
  );
}
