"use client";
import { FormField } from "@/components/form/FormField";
import { useEditTicket } from "@/hooks/useEditTicket";
import { GLOBAL } from "@/icons.data";
import type { EditTicketModal } from "@/types";

export default function EditTicketForm({
  user,
  rol,
  projects,
}: EditTicketModal) {
  const isDev = rol === "dev";
  const isTester = rol === "tester";
  const { circleSpin } = GLOBAL;

  const {
    titulo,
    setTitulo,
    descripcion,
    setDescripcion,
    pasosReproducir,
    setPasosReproducir,
    modulo,
    setModulo,
    estado,
    setEstado,
    prioridad,
    setPrioridad,
    severidadIa,
    setSeveridadIa,
    proyectoId,
    setProyectoId,
    usuarioAsignadoId,
    setUsuarioAsignadoId,
    loadingEdit,
    isFetching,
    handleEditSubmit,
  } = useEditTicket();

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
        <div className="text-[15px]">Titulo del ticket</div>
        <input
          type="text"
          value={titulo || ""}
          onChange={(e) => setTitulo(e.target.value)}
          className={`w-full rounded-lg px-3 py-2 text-sm transition
            ${
              isDev
                ? "bg-gray-100 border border-gray-200 text-gray-500 px-3 py-2 cursor-not-allowed"
                : "w-full rounded-lg border border-gray-400 px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            }`}
          disabled={isDev}
        />
      </FormField>

      <FormField>
        <div className="text-[15px]">Descripción</div>
        <textarea
          rows={5}
          cols={20}
          value={descripcion || ""}
          onChange={(e) => setDescripcion(e.target.value)}
          className={`w-full rounded-lg px-3 py-2 text-sm transition
            ${
              isDev
                ? "bg-gray-100 border border-gray-200 text-gray-500 px-3 py-2 cursor-not-allowed"
                : "w-full rounded-lg border border-gray-400 px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            }`}
          disabled={isDev}
        ></textarea>
      </FormField>

      <FormField>
        <div className="text-[15px]">
          Pasos para reproducir <span className="italic">(opcional)</span>
        </div>
        <textarea
          rows={5}
          cols={20}
          value={pasosReproducir || ""}
          onChange={(e) => setPasosReproducir(e.target.value)}
          className={`w-full rounded-lg px-3 py-2 text-sm transition
            ${
              isDev
                ? "bg-gray-100 border border-gray-200 text-gray-500 px-3 py-2 cursor-not-allowed"
                : "w-full rounded-lg border border-gray-400 px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            }`}
          disabled={isDev}
        ></textarea>
      </FormField>

      <FormField>
        <div className="text-[15px]">Seleccionar proyecto</div>
        <select
          value={proyectoId || ""}
          onChange={(e) => {
            const value = Number(e.target.value);

            setProyectoId(value);
          }}
          className={`
            w-full rounded-lg px-3 py-2 text-sm transition
            ${
              isDev || isTester
                ? "bg-gray-100 border border-gray-200 text-gray-500 px-3 py-2 cursor-not-allowed"
                : "border border-gray-400 text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            }
          `}
          disabled={isDev || isTester}
        >
          <option value="">Seleciona un proyecto</option>
          {projects.map(({ id, nombreProyecto }) => (
            <option key={id} value={id}>
              {nombreProyecto}
            </option>
          ))}
        </select>
      </FormField>

      <FormField>
        <div className="text-[15px]">Estado</div>
        <select
          value={estado || ""}
          onChange={(e) => {
            setEstado(e.target.value);
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
          <option value="">Selecciona el estado</option>
          <option value="PENDIENTE" disabled={isDev || isTester}>
            Pendiente
          </option>
          <option value="EN_REVISION" disabled={isTester}>
            En revisión
          </option>
          <option value="ASIGNADO" disabled={isTester}>
            Asignado
          </option>
          <option value="EN_CORRECCION" disabled={isDev}>
            En Corrección
          </option>
          <option value="EN_PRUEBAS" disabled={isDev}>
            En Pruebas
          </option>
          <option value="REABIERTO" disabled={isDev}>
            Reabierto
          </option>
          <option value="CERRADO" disabled={isDev}>
            Cerrado
          </option>
          <option value="CANCELADO" disabled={isDev || isTester}>
            Cancelado
          </option>
        </select>
      </FormField>

      <FormField>
        <div className="text-[15px]">Prioridad</div>
        <select
          value={prioridad || ""}
          onChange={(e) => setPrioridad(e.target.value)}
          className={`w-full rounded-lg px-3 py-2 text-sm transition
            ${
              isDev
                ? "bg-gray-100 border border-gray-200 text-gray-500 px-3 py-2 cursor-not-allowed"
                : "w-full rounded-lg border border-gray-400 px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            }`}
          disabled={isDev}
        >
          <option value="">Seleciona la prioridad</option>
          <option value="BAJA">Baja</option>
          <option value="MEDIA">Media</option>
          <option value="ALTA">Alta</option>
          <option value="CRITICA">Crítica</option>
        </select>
      </FormField>

      <FormField>
        <div className="text-[15px]">Severidad</div>
        <select
          value={severidadIa || ""}
          onChange={(e) => setSeveridadIa(e.target.value)}
          className={`
            w-full rounded-lg px-3 py-2 text-sm transition
            ${
              isDev
                ? "bg-gray-100 border border-gray-200 text-gray-500 px-3 py-2 cursor-not-allowed"
                : "w-full rounded-lg border border-gray-400 px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            }`}
          disabled={isDev}
        >
          <option value="">Seleciona la severidad</option>
          <option value="BAJA">Baja</option>
          <option value="MEDIA">Media</option>
          <option value="ALTA">Alta</option>
          <option value="CRITICA">Crítica</option>
        </select>
      </FormField>

      <FormField>
        <div className="text-[15px]">Módulo</div>
        <select
          value={modulo || ""}
          onChange={(e) => setModulo(e.target.value)}
          className={`
            w-full rounded-lg px-3 py-2 text-sm transition
            ${
              isDev
                ? "bg-gray-100 border border-gray-200 text-gray-500 px-3 py-2 cursor-not-allowed"
                : "w-full rounded-lg border border-gray-400 px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            }`}
          disabled={isDev}
        >
          <option value="">Seleciona un módulo</option>
          <option value="FRONTEND">Frontend</option>
          <option value="BACKEND">Backend</option>
          <option value="API">API</option>
          <option value="MOBILE">Mobile</option>
          <option value="BASE_DE_DATOS">Base de Datos</option>
        </select>
      </FormField>

      <FormField>
        <div className="text-[15px]">Asignar usuario</div>
        <select
          value={usuarioAsignadoId || ""}
          onChange={(e) => {
            const value = Number(e.target.value);
            setUsuarioAsignadoId(value);
          }}
          className={`
            w-full rounded-lg px-3 py-2 text-sm transition
            ${
              isDev || isTester
                ? "bg-gray-100 border border-gray-200 text-gray-500 px-3 py-2 cursor-not-allowed"
                : "border border-gray-400 text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            }
          `}
          disabled={isDev || isTester}
        >
          <option value="">Selecciona un usuario</option>
          {user.map(({ id, nombre }) => (
            <option key={id} value={id}>
              {nombre}
            </option>
          ))}
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
                className="h-5 w-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                {circleSpin()}
              </svg>
              Editando Ticket...
            </span>
          ) : (
            "Guardar"
          )}
        </button>
      </div>
    </form>
  );
}
