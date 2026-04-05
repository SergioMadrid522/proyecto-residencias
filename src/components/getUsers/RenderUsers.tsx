import { getUsers } from "@/utils/getFunctions";
import ActionButtons from "./ActionButtons";
export default async function RenderUsers() {
  const { users } = await getUsers();
  const rolText: string[] = ["unkown", "Admin", "Dev", "Tester"];
  return (
    <>
      {users.map(({ id, nombre, email, rolId, fechaRegistro }) => (
        <div key={id} className="border-b">
          <div className="grid grid-cols-5 m-auto items-center justify-center">
            <p className="border-r p-2">{nombre}</p>

            <p className="border-r p-2">{email}</p>

            <p className="p-2">{rolText[rolId]}</p>

            <p className="border-l border-r p-2">
              {fechaRegistro.toDateString()},{fechaRegistro.getHours()}:
              {fechaRegistro.getMinutes()}
            </p>

            <ActionButtons id={id} />
          </div>
        </div>
      ))}
    </>
  );
}
