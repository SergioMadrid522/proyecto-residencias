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
    <form
      onSubmit={handleEditSubmit}
      className="mx-auto flex w-full max-w-2xl flex-col gap-5"
    >
      <FormField>
        <div className="text-[15px]">Nombre del proyecto</div>
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
          rows={5}
          cols={20}
          value={descripcion || ""}
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

      <FormField>
        <div className="text-[15px]">¿Está activo?</div>
        <select
          name=""
          id=""
          value={status}
          onChange={(e) => {
            const value = Number(e.target.value);
            setStatus(value);
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
          <option value="0">Sí</option>
          <option value="1">No</option>
        </select>
      </FormField>

      <div className="flex items-center justify-center">
        <button
          type="submit"
          disabled={loadingEdit}
          className={`mt-2 flex w-full items-center justify-center rounded-lg px-4 py-2.5 font-medium text-white transition-all duration-200 ${
            loadingEdit
              ? "cursor-not-allowed bg-blue-400"
              : "cursor-pointer bg-blue-600 hover:bg-blue-700 hover:shadow-md active:scale-[0.98]"
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
  );
}
