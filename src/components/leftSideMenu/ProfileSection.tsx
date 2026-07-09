import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import LogoutButton from "./LogoutButton";
import { getUserSession } from "@/utils/getFunctions";
/*  */
export default async function ProfileSection() {
  const { user, rol } = await getUserSession();

  return (
    <div className="flex flex-col justify-end p-5">
      <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-bold">
          {user.name.charAt(0).toUpperCase()}
        </div>

        <div className="flex flex-col leading-tight">
          <p className="font-semibold text-gray-800">
            {capitalizeFirstLetter(user.name)}
          </p>

          <span className="text-sm text-gray-500">{rol}</span>
        </div>
      </div>

      <LogoutButton />
    </div>
  );
}
