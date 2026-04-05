import { getUsers } from "@/utils/getFunctions";
export default async function RenderUsers() {
  const { users } = await getUsers();
  const rolText: string[] = ["unkown", "Admin", "Dev", "Tester"];
  return (
    <>
      {users.map(({ id, nombre, email, rolId, fechaRegistro }) => (
        <div key={id} className="border-b">
          <div className="grid grid-cols-4 m-auto">
            <p className="border-r">{nombre}</p>
            <p className="border-r">{email}</p>
            <p>{rolText[rolId]}</p>
            <p className="border-l">
              {fechaRegistro.toDateString()},{fechaRegistro.getHours()}:
              {fechaRegistro.getMinutes()}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}
