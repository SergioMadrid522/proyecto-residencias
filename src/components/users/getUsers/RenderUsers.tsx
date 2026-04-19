import { getUsers } from "@/utils/getFunctions";
import ActionButtons from "./ActionButtons";
import { RolText } from "@/types";

export default async function RenderUsers() {
  const { user } = await getUsers();
  const rolText: RolText[] = ["unkown", "Admin", "Dev", "Tester"];

  return (
    <>
      {user.map(({ id, nombre, email, rolId, fechaRegistro }) => (
        <tbody key={id}>
          <tr key={id} className="border">
            <td className="border-r p-2 text-center">{nombre}</td>
            <td className="border-r p-2 text-center">{email}</td>
            <td className="p-2 text-center">{rolText[rolId]}</td>
            <td className="border-l border-r p-2 text-center">
              {fechaRegistro.toDateString()},{fechaRegistro.getHours()}:
              {fechaRegistro.getMinutes()}
            </td>
            <td>
              <ActionButtons id={id} />
            </td>
          </tr>
        </tbody>
      ))}
    </>
  );
}
