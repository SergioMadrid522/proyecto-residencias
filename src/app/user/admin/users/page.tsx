import AddNewUserButton from "@/components/users/getUsers/AddNewUserButton";
import RenderUsers from "@/components/users/getUsers/RenderUsers";
import CreateUser from "@/components/users/createUserModal/CreateUser";
import { getUserSession } from "@/utils/getFunctions";

export default async function Users() {
  const userSession = await getUserSession();

  return (
    <>
      <div className="flex justify-end my-4 gap-3.5">
        <AddNewUserButton />
      </div>

      <table className="w-full border-separate border-spacing-0 overflow-hidden rounded-lg shadow-sm">
        <thead>
          <tr className="bg-gray-50 text-gray-600 text-sm">
            <th className="border-b border-gray-200 px-5 py-3 text-center font-semibold">
              Nombre
            </th>
            <th className="border-b border-gray-200 px-5 py-3 text-center font-semibold">
              Email
            </th>
            <th className="border-b border-gray-200 px-5 py-3 text-center font-semibold">
              Rol
            </th>
            <th className="border-b border-gray-200 px-5 py-3 text-center font-semibold">
              Fecha de Registro
            </th>
            <th className="border-b border-gray-200 px-5 py-3 text-center font-semibold">
              Acciones
            </th>
          </tr>
        </thead>

        <RenderUsers />
      </table>

      <CreateUser />
    </>
  );
}
