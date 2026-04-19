import { getTickets, getUserById } from "@/utils/getFunctions";
import ActionButtons from "../users/getUsers/ActionButtons";
import Link from "next/link";

export default async function RenderTickets() {
  const { tickets, error } = await getTickets();

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
                  href={`/user/admin/tickets/ticket/${id}`}
                  className="underline"
                >
                  {titulo}
                </Link>
              </td>
              <td className="border-r p-2 text-center">{estado}</td>
              <td className="border-r p-2 text-center">{prioridad}</td>
              <td className="border-r p-2 text-center">
                {usuarioAsignado.nombre}
              </td>
              <td className="border-r p-2 text-center">
                {fechaCreacion.toDateString()}, {fechaCreacion.getHours()}:
                {fechaCreacion.getMinutes()}
              </td>
              <td className="p-2 text-center">
                <ActionButtons id={id} />
              </td>
            </tr>
          </tbody>
        ),
      )}
    </>
  );
}
