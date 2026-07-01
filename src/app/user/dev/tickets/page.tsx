import AddNewTicketButton from "@/components/tickets/AddNewTicketButton";
import CreateTicket from "@/components/tickets/createTicketModal/CreateTicket";
import EditTicket from "@/components/tickets/editTicketModal/EditTicket";
import RenderTickets from "@/components/tickets/RenderTickets";
import { useRolMapper } from "@/hooks/useRolMapper";
import { getUsers } from "@/utils/getFunctions";

export default async function Tickets() {
  const { user } = await getUsers();
  const { activeRol } = await useRolMapper();
  return (
    <>
      <div className="flex justify-end my-4">
        <AddNewTicketButton activeRol={activeRol} />
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border">
            <th className="border p-2">ID</th>
            <th className="border p-2">Titulo</th>
            <th className="border p-2">Estado</th>
            <th className="border p-2">Prioridad</th>
            <th className="border p-2">Asignado A</th>
            <th className="border p-2">Fecha de Creación</th>
            <th className="border p-2"></th>
          </tr>
        </thead>

        <RenderTickets />
      </table>

      <CreateTicket user={user} />
      <EditTicket user={user} rol={activeRol} />
    </>
  );
}
