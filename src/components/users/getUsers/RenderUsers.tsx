import { getRolText, getUsers } from "@/utils/getFunctions";
import ActionButtons from "../ActionButtons";

export default async function RenderUsers() {
  const { user } = await getUsers();

  return (
    <>
      {user.map(({ id, nombre, email, rolId, fechaRegistro }) => (
        <tbody key={id}>
          <tr key={id} className="transition hover:bg-gray-50">
            <td className="border-b border-gray-100 px-5 py-4 text-center text-sm text-gray-800">
              {nombre}
            </td>

            <td className="border-b border-gray-100 px-5 py-4 text-center text-sm text-gray-600">
              {email}
            </td>

            <td className="border-b border-gray-100 px-5 py-4 text-center">
              <span className="rounded-full px-3 py-1 text-xs font-medium">
                {getRolText(rolId)}
              </span>
            </td>

            <td className="border-b border-gray-100 px-5 py-4 text-center text-sm text-gray-600">
              {fechaRegistro.toLocaleDateString()}{" "}
              {fechaRegistro.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </td>

            <td className="border-b border-gray-100 px-5 py-4 text-center">
              <ActionButtons id={id} />
            </td>
          </tr>
        </tbody>
      ))}
    </>
  );
}
