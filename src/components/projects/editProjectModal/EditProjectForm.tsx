"use client";
import { FormField } from "@/components/form/FormField";
import { useEditProject } from "@/hooks/useEditProject";
import { GLOBAL } from "@/icons.data";

export default function EditProjectForm() {
  const { circleSpin } = GLOBAL;

  const {
    nombreProyecto,
    setNombreProyecto,
    descripcion,
    setDescripcion,
    status,
    setStatus,
    loadingEdit,
    isFetching,
    handleEditSubmit,
  } = useEditProject();

  if (isFetching) {
    return (
      <div className="flex w-full h-full justify-center items-center">
        <h2 className="p-4">Cargando datos...</h2>
      </div>
    );
  }

  return (
    <div>
      <h2 className="p-4">Editar proyecto</h2>

      <form
        onSubmit={handleEditSubmit}
        className="flex flex-col justify-center w-[80%] h-full gap-5 m-auto p-4 bg-white"
      >
        <FormField>
          <div className="text-[15px]">Titulo del proyecto</div>
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
            rows={5}
            cols={20}
            value={descripcion || ""}
            onChange={(e) => setDescripcion(e.target.value)}
            className="outline-1 rounded-sm px-2 py-1"
          ></textarea>
        </FormField>

        <FormField>
          <div className="text-[15px]">¿Sigue Está activo?</div>
          <select
            name=""
            id=""
            value={status}
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
                Editando proyecto...
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
