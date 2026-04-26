import {
  getRolText,
  getTicket,
  getTicketLevel,
  getTicketModule,
  getTicketStatus,
} from "@/utils/getFunctions";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { PropertiesPanel } from "@/components/tickets/PropertiesPanel";
import { ticketTimeline } from "@/services/ticket.service";

export default async function TicketPageContent({ id }: { id: string }) {
  const data = await getTicket(Number(id));
  const { ticket, error } = data;

  if (!ticket) {
    return <p>{error}</p>;
  }

  const timeline = await ticketTimeline(ticket.id);

  return (
    <div className="grid grid-cols-3 w-full">
      <div className="col-span-2 p-6">
        <h1 className="py-4 text-[26px]">ID: #{ticket.id}</h1>
        <h2 className="py-0 text-[26px]">
          Titulo: {capitalizeFirstLetter(ticket.titulo)}
        </h2>

        <div className="py-4">
          <p>Descripción:</p>
          <p className="">{capitalizeFirstLetter(ticket.descripcion)}</p>
        </div>

        {ticket.pasosReproducir !== "" && (
          <div className="pb-4">
            <p>Pasos a reproducir:</p>
            {ticket.pasosReproducir
              .split(/(?<!\w)(?=\d+\. )/)
              .map((paso, index) => (
                <p key={index}>{paso.trim()}</p>
              ))}
          </div>
        )}

        <div className="">
          <p>Historial</p>
          <table>
            <thead>
              <tr className="border">
                <th className="border p-2">Proyecto</th>
                <th className="border p-2">Usuario que reporto</th>
                <th className="border p-2">Rol</th>
                <th className="border p-2">Estado</th>
                <th className="border p-2">Prioridad</th>
                <th className="border p-2">Ultima actualización</th>
              </tr>
            </thead>
            <tbody>
              {timeline.map(({ id, ticket, fechaCambio, usuarioId }) => (
                <tr key={id} className="text-center border">
                  <td className="border-r p-2">
                    {capitalizeFirstLetter(ticket.proyecto.nombreProyecto!)}
                  </td>
                  <td className="border-r p-2">
                    {capitalizeFirstLetter(usuarioId)}
                  </td>
                  <td className="border-r p-2">{getRolText(usuarioId)}</td>
                  <td className="border-r p-2">
                    {getTicketStatus(ticket.estado!)}
                  </td>
                  <td className="border-r p-2">
                    {getTicketLevel(ticket.prioridad!)}
                  </td>
                  <td className="border-r p-2">
                    {fechaCambio.toDateString()}, {fechaCambio.getHours()}:
                    {String(fechaCambio.getMinutes()).padStart(2, "0")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col gap-6 p-17 h-fit mx-auto">
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
            {getTicketModule(ticket.modulo)}
          </PropertiesPanel.Value>
        </PropertiesPanel.Property>

        <PropertiesPanel.Property>
          <PropertiesPanel.Key>Asignado a:</PropertiesPanel.Key>
          <PropertiesPanel.Value>
            {ticket.usuarioAsignado.nombre}
          </PropertiesPanel.Value>
        </PropertiesPanel.Property>
      </div>
    </div>
  );
}
