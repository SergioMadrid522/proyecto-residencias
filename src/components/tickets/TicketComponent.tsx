import {
  getProjects,
  getTicket,
  getTicketLevel,
  getTicketModule,
  getTicketStatus,
  getUsers,
} from "@/utils/getFunctions";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { PropertiesPanel } from "@/components/tickets/PropertiesPanel";
import { ticketTimeline } from "@/services/ticket.service";
import EditButton from "./EditButton";
import { useRolMapper } from "@/hooks/useRolMapper";

export default async function TicketPageContent({ id }: { id: string }) {
  const ticketId = Number(id);
  const data = await getTicket(ticketId);
  const { user } = await getUsers();
  const { activeRol } = await useRolMapper();
  const { projects } = await getProjects();
  const { ticket, error } = data;
  const isAPI = ticket?.modulo === "API";

  if (!ticket) {
    return <p>{error}</p>;
  }

  const timeline = await ticketTimeline(ticketId);
  return (
    <div className="grid grid-cols-2 gap-8">
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="border-b border-gray-200 pb-6">
          <p className="text-sm font-medium text-gray-500">
            Ticket #{ticket.id}
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            {capitalizeFirstLetter(ticket.titulo)}
          </h1>
        </div>

        <div className="mt-8">
          <h2 className="mb-3 text-lg font-semibold text-gray-900">
            Descripción
          </h2>

          <p className="leading-7 text-gray-700">
            {capitalizeFirstLetter(ticket.descripcion)}
          </p>
        </div>

        {ticket.pasosReproducir && (
          <div className="mt-8">
            <h2 className="mb-3 text-lg font-semibold">
              Pasos para reproducir
            </h2>

            <ol className="list-decimal space-y-2 pl-6 text-gray-700">
              {ticket.pasosReproducir
                .split(/(?<!\w)(?=\d+\. )/)
                .map((paso: string, index: number) => (
                  <li key={index}>{paso.replace(/^\d+\.\s*/, "")}</li>
                ))}
            </ol>
          </div>
        )}

        <div className="mt-10">
          <h2 className="mb-4 text-xl font-semibold">Historial</h2>
          <div className="overflow-hidden rounded-xl border border-gray-200">
            <table className="w-full table-fixed">
              <thead className="sticky top-0 bg-gray-50">
                <tr className="">
                  <th className="px-2 py-3 text-center text-sm font-semibold text-gray-700">
                    Proyecto
                  </th>
                  <th className="px-2 py-3 text-center text-sm font-semibold text-gray-700">
                    Usuario asignado
                  </th>
                  <th className="px-2 py-3 text-center text-sm font-semibold text-gray-700">
                    Rol
                  </th>
                  <th className="px-2 py-3 text-center text-sm font-semibold text-gray-700">
                    Estado
                  </th>
                  <th className="px-2 py-3 text-center text-sm font-semibold text-gray-700">
                    Prioridad
                  </th>
                  <th className="px-2 py-3 text-center text-sm font-semibold text-gray-700">
                    Ultima actualización
                  </th>
                </tr>
              </thead>
              <tbody>
                {timeline.map(
                  ({ id, ticket, fechaCambio, usuario, estadoNuevo }) => (
                    <tr key={id} className="">
                      <td className="border-t border-gray-100 px-2  py-3 text-sm text-center text-gray-600">
                        {capitalizeFirstLetter(ticket.proyecto.nombreProyecto!)}
                      </td>
                      <td className="border-t border-gray-100 px-2  py-3 text-sm text-center text-gray-600">
                        {usuario.nombre}
                      </td>
                      <td className="border-t border-gray-100 px-2  py-3 text-sm text-center text-gray-600">
                        {ticket.usuarioReporta?.rolId}
                      </td>
                      <td className="border-t border-gray-100 px-2  py-3 text-sm text-center text-gray-600">
                        {getTicketStatus(estadoNuevo)}
                      </td>
                      <td className="border-t border-gray-100 px-2  py-3 text-sm text-center text-gray-600">
                        {getTicketLevel(ticket.prioridad!)}
                      </td>
                      <td className="border-t border-gray-100 px-2  py-3 text-sm text-center text-gray-600">
                        {new Intl.DateTimeFormat("es-MX", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        }).format(fechaCambio)}
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="sticky top-6 h-fit space-y-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Propiedades</h2>
          <EditButton
            id={ticketId}
            user={user}
            rol={activeRol}
            projects={projects}
          />
        </div>

        <PropertiesPanel.Property>
          <PropertiesPanel.Key>Proyecto:</PropertiesPanel.Key>
          <PropertiesPanel.Value>
            {ticket.proyecto.nombreProyecto}
          </PropertiesPanel.Value>
        </PropertiesPanel.Property>

        <PropertiesPanel.Property>
          <PropertiesPanel.Key>Estado actual:</PropertiesPanel.Key>
          <PropertiesPanel.Value>
            {getTicketStatus(ticket.estado)}
          </PropertiesPanel.Value>
        </PropertiesPanel.Property>

        <PropertiesPanel.Property>
          <PropertiesPanel.Key>Prioridad:</PropertiesPanel.Key>
          <PropertiesPanel.Value>
            {getTicketLevel(ticket.prioridad)}
          </PropertiesPanel.Value>
        </PropertiesPanel.Property>

        <PropertiesPanel.Property>
          <PropertiesPanel.Key>Severidad:</PropertiesPanel.Key>
          <PropertiesPanel.Value>
            {getTicketLevel(ticket.severidadIa!)}
          </PropertiesPanel.Value>
        </PropertiesPanel.Property>

        <PropertiesPanel.Property>
          <PropertiesPanel.Key>Módulo:</PropertiesPanel.Key>
          <PropertiesPanel.Value>
            {isAPI ? ticket.modulo : getTicketModule(ticket.modulo)}
          </PropertiesPanel.Value>
        </PropertiesPanel.Property>

        <PropertiesPanel.Property>
          <PropertiesPanel.Key>Responsable:</PropertiesPanel.Key>
          <PropertiesPanel.Value>
            {ticket.usuarioAsignado.nombre}
          </PropertiesPanel.Value>
        </PropertiesPanel.Property>
      </div>
    </div>
  );
}
