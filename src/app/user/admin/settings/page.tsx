import ProfileSection from "@/components/settings/ProfileSection";
import DangerZone from "@/components/settings/DangerZone";

export default async function Settings() {
  return (
    <section className="flex flex-col gap-5">
      <article className="overflow-hidden border border-gray-300 rounded-lg">
        <ProfileSection />
      </article>

      <article className="border border-red-300 rounded-lg overflow-hidden">
        <DangerZone />
      </article>
    </section>
  );
}
