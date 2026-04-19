import Link from "next/link";
import { ChartContainer } from "./ChartContainer";
import PieGraph from "./graphs/PieGraph";
import SimpleBarGraph from "./graphs/SimpleBarGraph";
import SimpleGraphChart from "./graphs/SimpleGraphChart";
import { StatsCard } from "./StatsCard";
import { StatsTitle } from "./StatsTitle";
import RecentTickets from "./graphs/RecentTickets";
import { GLOBAL } from "@/icons.data";

export default function DashboardStats() {
  const { chevronRight } = GLOBAL;
  return (
    <section className="grid grid-cols-2 gap-6 p-6">
      <StatsCard>
        <StatsTitle>Tasa de Reapertura de bugs</StatsTitle>

        <ChartContainer>
          <PieGraph />

          <div className="flex flex-col gap-5 text-lg px-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#ef4444] rounded-sm"></div>
              <p>Reabiertos</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#3b82f6] rounded-sm"></div>
              <p>Cerrados</p>
            </div>
          </div>
        </ChartContainer>
      </StatsCard>

      <StatsCard>
        <StatsTitle>Tendencia de Errores</StatsTitle>

        <ChartContainer>
          <SimpleGraphChart />
        </ChartContainer>
      </StatsCard>

      <StatsCard>
        <StatsTitle>
          Tickets Recientes
          <div className="text-md text-[#3b82f6] hover:underline ">
            <Link
              href={"/user/admin/tickets"}
              className="flex items-center justify-center"
            >
              Ver todo
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path fillRule="evenodd" d={chevronRight} />
              </svg>
            </Link>
          </div>
        </StatsTitle>

        <RecentTickets />
      </StatsCard>

      <StatsCard>
        <StatsTitle>Módulos más inestables</StatsTitle>

        <ChartContainer>
          <SimpleBarGraph />
        </ChartContainer>
      </StatsCard>
    </section>
  );
}
