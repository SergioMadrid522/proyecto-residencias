import AddNewUserButton from "@/components/users/getUsers/AddNewUserButton";
import RenderUsers from "@/components/users/getUsers/RenderUsers";
import CreateUser from "@/components/users/createUserModal/CreateUser";
import { getUserSession } from "@/utils/getFunctions";

export default async function Users() {
  const userSession = await getUserSession();

  return (
    <>
      <div className="flex justify-end my-4 gap-3.5">
        <AddNewUserButton rol={userSession.rol} />
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border">
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Rol</th>
            <th className="border p-2">Fecha de Registro</th>
          </tr>
        </thead>

        <RenderUsers />
      </table>

      <CreateUser />
    </>
  );
}
