import DashboardHeader from "@/components/dashboardItems/DashboardHeader";
import DashboardOverview from "@/components/dashboardItems/DashboardOverview";
import DashboardStats from "@/components/dashboardItems/DashboardStats";

export default function Dashboard() {
  return (
    <>
      {/* <DashboardHeader /> */}
      <DashboardOverview />
      <DashboardStats />
    </>
  );
}
