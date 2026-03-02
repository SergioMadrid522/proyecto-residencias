import ProfileSection from "./profileSection";
import RenderOptions from "./RenderOptions";

export default function LeftSideMenu() {
  return (
    <>
      <div>
        <h1 className="py-6 text-center border-b">Bug Tracker</h1>

        <RenderOptions />

        <ProfileSection />
      </div>
    </>
  );
}
