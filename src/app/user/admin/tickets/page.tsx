import AddNewTicketButton from "@/components/tickets/AddNewTicketButton";
import CreateTicket from "@/components/tickets/createTicketModal/CreateTicket";
import EditTicket from "@/components/tickets/editTicketModal/EditTicket";
import RenderTickets from "@/components/tickets/RenderTickets";
import { useRolMapper } from "@/hooks/useRolMapper";
import { getProjects, getUsers } from "@/utils/getFunctions";

export default async function Tickets() {
  const { user } = await getUsers();
  const { projects } = await getProjects();

  const { activeRol } = await useRolMapper();

  return (
    <>
      <div className="flex justify-end my-4 gap-3">
        <AddNewTicketButton activeRol={activeRol} />
      </div>

      <table className="w-full border-separate border-spacing-0 overflow-hidden rounded-xl bg-white shadow-sm">
        <thead>
          <tr className="bg-gray-50">
            <th className="border-b border-gray-200 px-5 py-3 text-center text-sm font-semibold text-gray-600">
              ID
            </th>

            <th className="border-b border-gray-200 px-5 py-3 text-left text-sm font-semibold text-gray-600">
              Título
            </th>

            <th className="border-b border-gray-200 px-5 py-3 text-center text-sm font-semibold text-gray-600">
              Estado
            </th>

            <th className="border-b border-gray-200 px-5 py-3 text-center text-sm font-semibold text-gray-600">
              Prioridad
            </th>

            <th className="border-b border-gray-200 px-5 py-3 text-center text-sm font-semibold text-gray-600">
              Responsable
            </th>

            <th className="border-b border-gray-200 px-5 py-3 text-center text-sm font-semibold text-gray-600">
              Fecha de Creación
            </th>

            <th className="border-b border-gray-200 px-5 py-3 text-center text-sm font-semibold text-gray-600">
              Acciones
            </th>
          </tr>
        </thead>
        <RenderTickets />
      </table>

      <CreateTicket user={user} projects={projects} rol={activeRol} />
      <EditTicket user={user} rol={activeRol} projects={projects} />
    </>
  );
}
