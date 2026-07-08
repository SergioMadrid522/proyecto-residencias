import { findUserById } from "@/services/user.service";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { getFirstLetter, getUserSession } from "@/utils/getFunctions";
import { ConfigurationCard } from "./ConfigurationCard";
import PasswordForm from "./PasswordForm";

export default async function ProfileSection() {
  const session = await getUserSession();
  const sessionUserId = Number(session.user.id);
  const user = await findUserById(sessionUserId);

  if (!user) {
    return (
      <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
        No hay datos por mostrar.
      </p>
    );
  }

  return (
    <ConfigurationCard.Card>
      <ConfigurationCard.TitleSection>
        <ConfigurationCard.Title>Mi perfil</ConfigurationCard.Title>

        <ConfigurationCard.Subtitle>
          Aquí podrás editar la información de tu cuenta.
        </ConfigurationCard.Subtitle>
      </ConfigurationCard.TitleSection>

      <div className="flex items-center gap-6 p-6 ">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white shadow-md">
          {getFirstLetter(user.nombre)}
          {getFirstLetter(user.lastname!)}
        </div>

        <div className="space-y-1">
          <h3 className="text-xl font-semibold text-gray-900">
            {capitalizeFirstLetter(user.nombre)}{" "}
            {capitalizeFirstLetter(user.lastname!)}
          </h3>

          <p className="text-gray-600">{user.email}</p>

          <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
            {session.rol}
          </span>
        </div>
      </div>

      <div className="mx-6 border-t border-gray-200" />

      <div className="p-6">
        <PasswordForm user={user} />
      </div>
    </ConfigurationCard.Card>
  );
}
