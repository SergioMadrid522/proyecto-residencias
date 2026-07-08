import GlobalNavbar from "@/components/globalNavbar/GlobalNavbar";
import LeftSideMenu from "@/components/leftSideMenu/LeftSideMenu";
import ProfileSection from "@/components/leftSideMenu/ProfileSection";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <GlobalNavbar />
      <main className="grid grid-cols-[240px_1fr] h-[calc(100dvh-64px)]">
        <section className="flex flex-col justify-between bg-white shadow-lg border-r  border-gray-100">
          <LeftSideMenu />
          <ProfileSection />
        </section>

        <section className="p-5 min-h-0">{children}</section>
      </main>
    </>
  );
}
