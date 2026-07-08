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
            <tr key={id} className="transition hover:bg-gray-50">
              <td className="border-b border-gray-100 px-5 py-4 text-center text-sm text-gray-500">
                #{id}
              </td>

              <td className="border-b border-gray-100 px-5 py-4">
                <Link
                  href={`/user/${rolText}/tickets/ticket/${id}`}
                  className="font-medium text-gray-700 hover:text-gray-900 hover:underline"
                >
                  {capitalizeFirstLetter(titulo)}
                </Link>
              </td>

              <td className="border-b border-gray-100 px-5 py-4 text-center">
                <span className="flex items-center justify-center rounded-full bg-yellow-100 px-3 py-1 text-xs text-center font-medium text-yellow-700">
                  {getTicketStatus(estado)}
                </span>
              </td>

              <td className="border-b border-gray-100 px-5 py-4 text-center">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    prioridad === "CRITICA"
                      ? "bg-red-100 text-red-700"
                      : prioridad === "ALTA"
                        ? "bg-orange-100 text-orange-700"
                        : prioridad === "MEDIA"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                  }`}
                >
                  {getTicketLevel(prioridad)}
                </span>
              </td>

              <td className="border-b border-gray-100 px-5 py-4 text-center text-sm text-gray-700">
                {capitalizeFirstLetter(usuarioAsignado.nombre)}
              </td>

              <td className="border-b border-gray-100 px-5 py-4 text-center text-sm text-gray-500">
                {new Intl.DateTimeFormat("es-MX", {
                  dateStyle: "medium",
                  timeStyle: "short",
                }).format(fechaCreacion)}
              </td>

              <td className="border-b border-gray-100 px-5 py-4 text-center">
                <ActionButtons id={id} userRol={rolText} />
              </td>
            </tr>
          </tbody>
        ),
      )}
    </>
  );
}
