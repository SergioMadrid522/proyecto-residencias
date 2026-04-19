import AddNewUserButton from "@/components/users/getUsers/AddNewUserButton";
import RenderUsers from "@/components/users/getUsers/RenderUsers";
import CreateUser from "@/components/users/createUserModal/CreateUser";
import EditUser from "@/components/users/editUserModal/EditUser";

export default function Users() {
  return (
    <>
      <div className="flex justify-end my-4">
        <AddNewUserButton />
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
      <EditUser />
    </>
  );
}
