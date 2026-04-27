import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import LogoutButton from "./LogoutButton";
import { getUserSession } from "@/utils/getFunctions";

export default async function ProfileSection() {
  const { user, rol } = await getUserSession();

  return (
    <div className="flex flex-col items-center gap-2.5 p-8">
      <p>{`${capitalizeFirstLetter(user.name)} | ${rol}`}</p>

      <LogoutButton />
    </div>
  );
}
