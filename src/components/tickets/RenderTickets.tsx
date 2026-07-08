import {
  getRolText,
  getTicketLevel,
  getTickets,
  getTicketStatus,
  getUserSession,
} from "@/utils/getFunctions";

import Link from "next/link";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import ActionButtons from "@/components/tickets/ActionsButtons";

export default async function RenderTickets() {
  const { tickets, error } = await getTickets();
  const { rolId } = await getUserSession();
  const rolText = getRolText(rolId).toLowerCase();

  if (!tickets) {
    return <p>{error}</p>;
  }

  return (
    <>
      {tickets.map(
        ({ id, titulo, estado, prioridad, fechaCreacion, usuarioAsignado }) => (
          <tbody key={id}>
            <tr key={id} className="border">
              <td className="border-r p-2 text-center">{id}</td>
              <td className="border-r p-2">
                <Link
                  href={`/user/${rolText}/tickets/ticket/${id}`}
                  className="underline"
                >
                  {capitalizeFirstLetter(titulo)}
                </Link>
              </td>
              <td className="border-r p-2 text-center">
                {getTicketStatus(estado)}
              </td>
              <td className="border-r p-2 text-center">
                {getTicketLevel(prioridad)}
              </td>
              <td className="border-r p-2 text-center">
                {capitalizeFirstLetter(usuarioAsignado.nombre)}
              </td>
              <td className="border-r p-2 text-center">
                {new Intl.DateTimeFormat("es-MX", {
                  dateStyle: "medium",
                  timeStyle: "short",
                }).format(fechaCreacion)}
              </td>
              <td>
                <ActionButtons id={id} userRol={rolText} />
              </td>
            </tr>
          </tbody>
        ),
      )}
    </>
  );
}
