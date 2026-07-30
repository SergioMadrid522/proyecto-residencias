import DashboardOverview from "@/components/dashboardItems/DashboardOverview";
import DashboardStats from "@/components/dashboardItems/DashboardStats";
import CreateReportButton from "@/components/pdfComponent/CreateReportButton";

export default function Dashboard() {
  return (
    <>
      <CreateReportButton />
      <DashboardOverview />
      <DashboardStats />
    </>
  );
}
