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
    return <p>No hay datos por mostrar</p>;
  }

  return (
    <ConfigurationCard.Card>
      <ConfigurationCard.TitleSection>
        <ConfigurationCard.Title>Mi perfil</ConfigurationCard.Title>
        <ConfigurationCard.Subtitle>
          Aquí podrás editar tu perfil
        </ConfigurationCard.Subtitle>
      </ConfigurationCard.TitleSection>

      <div className="flex gap-4 items-center p-4">
        <div className="border flex w-20 h-20 rounded-full items-center justify-center text-center">
          <p className="text-2xl">
            {getFirstLetter(user.nombre)}
            {getFirstLetter(user.lastname!)}
          </p>
        </div>

        <div className="flex-col">
          <p>
            {capitalizeFirstLetter(user.nombre)}{" "}
            {capitalizeFirstLetter(user.lastname!)}
          </p>
          <p>{user.email}</p>
        </div>
      </div>

      <div className="border border-gray-200 w-[95%] m-auto" />

      <div className="p-4">
        <PasswordForm user={user} />
      </div>
    </ConfigurationCard.Card>
  );
}
