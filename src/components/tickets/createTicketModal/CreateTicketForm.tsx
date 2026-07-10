import { FormField } from "@/components/form/FormField";
import { useCreateTicket } from "@/hooks/useCreateTicket";
import { GLOBAL } from "@/icons.data";
import { CreateTicketProps } from "@/types";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";

export default function CreateTicketForm({
  user,
  rol,
  projects,
}: CreateTicketProps) {
  const isDev = rol === "dev";
  const isTester = rol === "tester";
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
    loading,
    handleSubmit,
  } = useCreateTicket();

  const { circleSpin } = GLOBAL;

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-2xl flex-col gap-5"
    >
      <FormField>
        <div className="text-[15px]">Titulo del ticket</div>
        <input
          type="text"
          value={titulo || ""}
          onChange={(e) => setTitulo(e.target.value)}
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

      <FormField>
        <div className="text-[15px]">
          Pasos para reproducir <span className="italic">(opcional)</span>
        </div>
        <textarea
          value={pasosReproducir || ""}
          rows={5}
          cols={20}
          onChange={(e) => setPasosReproducir(e.target.value)}
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
        <div className="text-[15px]">Seleccionar proyecto</div>
        <select
          value={proyectoId || ""}
          onChange={(e) => {
            const value = Number(e.target.value);
            setProyectoId(value);
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
          onChange={(e) => setEstado(e.target.value)}
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
          onChange={(e) => {
            const value = e.target.value as
              | "BAJA"
              | "MEDIA"
              | "ALTA"
              | "CRITICA";
            setSeveridadIa(value);
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
          <option value="">Selecciona un usuario</option>
          {user.map(({ id, nombre, lastname }) => (
            <option key={id} value={id}>
              {capitalizeFirstLetter(nombre)} {capitalizeFirstLetter(lastname!)}
            </option>
          ))}
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
