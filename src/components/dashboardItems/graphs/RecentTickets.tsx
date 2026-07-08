import { getRecetTickets } from "@/rechartsData/getDashboardData";
import { getTimeToCurrentDate, severityStyles } from "@/utils/getFunctions";
import Link from "next/link";

export default async function RecentTickets() {
  const data = await getRecetTickets();
  if (!data) {
    return <p>No hay datos para mostrar</p>;
  }

  return (
    <>
      {data.map(({ id, titulo, severidadIa, historial }) => {
        const lastUpdate = historial[0].fechaCambio;
        return (
          <div
            className="flex items-center justify-between border-t py-4"
            key={id}
          >
            <Link
              href={`/user/admin/tickets/ticket/${id}`}
              className="block max-w-[400px] truncate hover:underline"
            >
              #{id} {titulo}
              <span
                className={`ml-1 font-bold ${severityStyles(severidadIa!)}`}
              >
                ({severidadIa})
              </span>
            </Link>

            <p className="text-rigth text-sm text-gray-500">
              Hace {getTimeToCurrentDate(lastUpdate)}
            </p>
          </div>
        );
      })}
    </>
  );
}
