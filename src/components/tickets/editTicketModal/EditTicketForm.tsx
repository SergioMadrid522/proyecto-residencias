"use client";
import { FormField } from "@/components/form/FormField";
import { useEditTicket } from "@/hooks/useEditTicket";
import { GLOBAL } from "@/icons.data";
import type { EditTicketModal } from "@/types";

export default function EditTicketForm({ user, rol }: EditTicketModal) {
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
    <div>
      <h2 className="p-4">Editar Ticket</h2>

      <form
        onSubmit={handleEditSubmit}
        className="flex flex-col justify-center w-[80%] h-full gap-5 m-auto p-4 bg-white"
      >
        <FormField>
          <div className="text-[15px]">Titulo del ticket</div>
          <input
            type="text"
            value={titulo || ""}
            onChange={(e) => setTitulo(e.target.value)}
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
          <div className="text-[15px]">
            Pasos para reproducir <span className="italic">(opcional)</span>
          </div>
          <textarea
            rows={5}
            cols={20}
            value={pasosReproducir || ""}
            onChange={(e) => setPasosReproducir(e.target.value)}
            className="outline-1 rounded-sm px-2 py-1"
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
            className="outline-1 rounded-sm px-2 py-1"
          >
            <option value="">Seleciona un proyecto</option>
            <option value="1">proyecto 1</option>
          </select>
        </FormField>

        <FormField>
          <div className="text-[15px]">Estado</div>
          <select
            value={estado || ""}
            onChange={(e) => setEstado(e.target.value)}
            className="outline-1 rounded-sm px-2 py-1"
          >
            <option value="">Seleciona el estado</option>
            {isDev ? (
              <>
                <option value="EN_REVISION">En revisón</option>
                <option value="ASIGNADO">Asignado</option>
              </>
            ) : isTester ? (
              <>
                <option value="EN_PRUEBAS">En Pruebas</option>
                <option value="EN_CORRECCION">En Corrección</option>
                <option value="CERRADO">Cerrado</option>
                <option value="REABIERTO">Reabierto</option>
              </>
            ) : (
              <>
                <option value="PENDIENTE">Pendiente</option>
                <option value="EN_REVISION">En revisón</option>
                <option value="ASIGNADO">Asignado</option>
                <option value="EN_CORRECCION">En Corrección</option>
                <option value="EN_PRUEBAS">En Pruebas</option>
                <option value="REABIERTO">Reabierto</option>
                <option value="CERRADO">Cerrado</option>
                <option value="CANCELADO">Cancelado</option>
              </>
            )}
          </select>
        </FormField>

        <FormField>
          <div className="text-[15px]">Prioridad</div>
          <select
            value={prioridad || ""}
            onChange={(e) => setPrioridad(e.target.value)}
            className="outline-1 rounded-sm px-2 py-1"
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
            className="outline-1 rounded-sm px-2 py-1"
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
            className="outline-1 rounded-sm px-2 py-1"
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
            className="outline-1 rounded-sm px-2 py-1"
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
                Creando ticket
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
