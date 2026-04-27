import { findUserById } from "@/services/user.service";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { getFirstLetter, getUserSession } from "@/utils/getFunctions";
import { ConfigurationCard } from "./ConfigurationCard";

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
          Visible para todos los roles
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
        <form action="">
          <div className="flex gap-5 pb-2">
            <div>
              <p>Nombre</p>
              <input
                type="text"
                className="outline rounded-sm p-1 bg-black/10"
                value={user.nombre}
                readOnly
              />
            </div>
            <div>
              <p>Email</p>
              <input
                type="text"
                className="outline rounded-sm select-none bg-black/10 p-1"
                value={user.email}
                readOnly
              />
            </div>
          </div>

          <div className="flex gap-5 pt-2">
            <div>
              <p>Contraseña actual</p>
              <input type="password" className="outline rounded-sm p-1" />
            </div>
            <div>
              <p>Nueva Contraseña</p>
              <input type="password" className="outline rounded-sm p-1" />
            </div>
          </div>

          <div className="flex items-center justify-end gap-4">
            <button
              type="reset"
              className="outline rounded-md p-1 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="outline rounded-md p-1 cursor-pointer"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </ConfigurationCard.Card>
  );
}
