import { GLOBAL } from "@/icons.data";
import {
  getOpenTickets,
  getReviewTickets,
  getCriticalTickets,
  getMTTR,
} from "@/rechartsData/getDashboardData";
import { StatsOverview } from "@/types";

export default async function DashboardOverview() {
  const openTicketsCount = await getOpenTickets();
  const rewiewTicketCount = await getReviewTickets();
  const criticalTicketCount = await getCriticalTickets();
  const mttr = await getMTTR();

  const statsOverview: StatsOverview[] = [
    {
      icon: GLOBAL.reportsIcon,
      iconViewbox: "0 0 640 640",
      title: "Tickets Abiertos",
      color: "#F54927",
      stats: openTicketsCount,
    },
    {
      icon: GLOBAL.sandClockIcon,
      iconViewbox: "0 0 16 16",
      title: "Tickets En Revisión",
      color: "#E0AF0B",
      stats: rewiewTicketCount,
    },
    {
      icon: GLOBAL.fireIcon,
      iconViewbox: "0 0 16 16",
      title: "Tickets con prioridad Crítica",
      color: "#F54927",
      stats: criticalTicketCount,
    },
    {
      icon: GLOBAL.clockIcon,
      iconViewbox: "0 0 16 16",
      title: "MTTR Promedio",
      color: "#66B555",
      stats: mttr,
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-3 justify-around px-6 rounded-2xl ">
      {statsOverview.map(({ icon: Icon, iconViewbox, title, color, stats }) => (
        <div key={title} className="border rounded-md shadow-lg px-2 py-4">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svag"
              width="25"
              height="25"
              fill={color}
              viewBox={iconViewbox}
            >
              <Icon />
            </svg>
            <p className="text-[18px]">{title}</p>
          </div>
          <p className="px-1 font-bold">
            {title.toLowerCase() === "mttr promedio" ? (
              <>
                <span className="text-[25px]">{stats}</span>
                <span className="text-[18px]"> h</span>
              </>
            ) : (
              <span className="text-[25px]">{stats}</span>
            )}
          </p>
        </div>
      ))}
    </div>
  );
}
