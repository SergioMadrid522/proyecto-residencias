import { recentTickets } from "@/data";
import Link from "next/link";

export default function RecentTickets() {
  const severityStyles: Record<string, string> = {
    Critica: "text-red-500",
    Alta: "text-red-500",
    Media: "text-[#3b82f6]",
    Baja: "text-green-800",
  };
  return (
    <>
      {recentTickets.map(
        ({ id, titulo, severidad, ultimaActualizacion, link }) => (
          <div className="border-t py-4" key={id}>
            <Link href={`${link}-${id}`} className="flex justify-between">
              <p>
                {`#${id} ${titulo}`}{" "}
                <span
                  className={`font-[700] ${severityStyles[severidad] ?? "text-black"}`}
                >
                  ({severidad})
                </span>
              </p>
              <p>Hace {ultimaActualizacion}</p>
            </Link>
          </div>
        ),
      )}
    </>
  );
}
