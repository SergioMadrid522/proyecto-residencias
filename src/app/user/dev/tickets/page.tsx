import AddNewTicketButton from "@/components/tickets/AddNewTicketButton";
import CreateTicket from "@/components/tickets/createTicketModal/CreateTicket";
import RenderTickets from "@/components/tickets/RenderTickets";
import { getUsers } from "@/utils/getFunctions";

export default async function Tickets() {
  const { user } = await getUsers();

  return (
    <>
      <div className="flex justify-end my-4">
        <AddNewTicketButton />
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
    </>
  );
}
