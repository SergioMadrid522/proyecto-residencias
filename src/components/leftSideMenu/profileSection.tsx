import LogoutButton from "./LogoutButton";
import { getUserSession } from "@/utils/getFunctions";

export default async function ProfileSection() {
  const { username, rol } = await getUserSession();

  return (
    <div className="flex flex-col items-center gap-2.5 p-8">
      <p>{`${username} | ${rol}`}</p>

      <LogoutButton />
    </div>
  );
}
