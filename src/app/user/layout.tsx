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
      <main className="grid grid-cols-[200px_1fr] h-[calc(100dvh-64px)]">
        <section className="border-r flex flex-col justify-between">
          <LeftSideMenu />
          <ProfileSection />
        </section>

        <section className="p-5">{children}</section>
      </main>
    </>
  );
}
