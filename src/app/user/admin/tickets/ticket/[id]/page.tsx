import { getTicket } from "@/utils/getFunctions";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { PropertiesPanel } from "@/components/tickets/PropertiesPanel";
export default async function TicketPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getTicket(Number(id));
  const { ticket, error } = data;

  const ticketState = {
    "": "",
  };
  if (!ticket) {
    return <p>{error}</p>;
  }

  return (
    <div className="grid grid-cols-3 w-full">
      <div className="col-span-2 p-6">
        <h1 className="px-2 py-4 text-[26px]">ID: #{ticket.id}</h1>
        <h2 className="px-2 py-0 text-[26px]">
          Titulo: {capitalizeFirstLetter(ticket.titulo)}
        </h2>

        <div className="py-4">
          <p>Descripción:</p>
          <p className="py-4">{capitalizeFirstLetter(ticket.descripcion)}</p>
        </div>

        {ticket.pasosReproducir !== "" && (
          <div className="py-4">
            <p>Pasos a reproducir:</p>
            {/* <p>{ticket.pasosReproducir}</p> */}
            {ticket.pasosReproducir.split(/(?=\d+\.)/).map((paso, index) => (
              <p key={index}>{paso.trim()}</p>
            ))}
            {/* 
          <ul className="list-decimal list-inside flex flex-col gap-2">
            {ticket.pasosReproducir.split(/(?=\d+\.)/).map((paso, index) => (
              <li key={index}>{paso.replace(/^\d+\./, "").trim()}</li>
            ))}
          </ul>
          */}
          </div>
        )}

        <div className="py-4">
          <p>Historial</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 p-14 h-fit mx-auto">
        <PropertiesPanel.Property>
          <PropertiesPanel.Key>Proyecto:</PropertiesPanel.Key>
          <PropertiesPanel.Value>
            {ticket.proyecto.nombreProyecto}
          </PropertiesPanel.Value>
        </PropertiesPanel.Property>

        <PropertiesPanel.Property>
          <PropertiesPanel.Key>Estado actual:</PropertiesPanel.Key>
          <PropertiesPanel.Value>{ticket.estado}</PropertiesPanel.Value>
        </PropertiesPanel.Property>

        <PropertiesPanel.Property>
          <PropertiesPanel.Key>Prioridad:</PropertiesPanel.Key>
          <PropertiesPanel.Value>{ticket.prioridad}</PropertiesPanel.Value>
        </PropertiesPanel.Property>

        <PropertiesPanel.Property>
          <PropertiesPanel.Key>Asignado a:</PropertiesPanel.Key>
          <PropertiesPanel.Value>
            {ticket.usuarioAsignado.nombre}
          </PropertiesPanel.Value>
        </PropertiesPanel.Property>

        <PropertiesPanel.Property>
          <PropertiesPanel.Key>Módulo:</PropertiesPanel.Key>
          <PropertiesPanel.Value>{ticket.modulo}</PropertiesPanel.Value>
        </PropertiesPanel.Property>
      </div>
    </div>
  );
}
