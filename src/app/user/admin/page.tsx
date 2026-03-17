import DashboardHeader from "@/components/dashboardItems/DashboardHeader";
import DashboardOverview from "@/components/dashboardItems/DashboardOverview";
import DashboardStats from "@/components/dashboardItems/DashboardStats";
import GlobalNavbar from "@/components/globalNavbar/GlobalNavbar";
import LeftSideMenu from "@/components/leftSideMenu/LeftSideMenu";
import ProfileSection from "@/components/leftSideMenu/ProfileSection";

export default function Dashboard() {
  return (
    <>
      <GlobalNavbar />

      <main className="grid grid-cols-[200px_1fr] h-[calc(100dvh-64px)]">
        <section className="border-r flex flex-col justify-between">
          <LeftSideMenu />
          <ProfileSection />
        </section>

        <section className="p-5">
          <DashboardHeader />
          <DashboardOverview />
          <DashboardStats />
        </section>
      </main>
    </>
  );
}
