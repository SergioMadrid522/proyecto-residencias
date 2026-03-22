import DashboardHeader from "@/components/dashboardItems/DashboardHeader";
import DashboardOverview from "@/components/dashboardItems/DashboardOverview";
import DashboardStats from "@/components/dashboardItems/DashboardStats";
import GlobalNavbar from "@/components/globalNavbar/GlobalNavbar";
import LeftSideMenu from "@/components/leftSideMenu/LeftSideMenu";
import ProfileSection from "@/components/leftSideMenu/ProfileSection";

export default function Dashboard() {
  return (
    <>
      <DashboardHeader />
      <DashboardOverview />
      <DashboardStats />
    </>
  );
}
