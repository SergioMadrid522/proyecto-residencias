import CreateUser from "@/components/createUserModal/CreateUser";
import AddNewUserButton from "@/components/getUsers/AddNewUserButton";
import RenderUsers from "@/components/getUsers/RenderUsers";

export default function Users() {
  return (
    <>
      <div className="flex justify-end my-4">
        <AddNewUserButton />
      </div>

      <div className="text-center">
        <div className="grid grid-cols-4 justify-center items-center border">
          <p>Nombre</p>
          <p>Email</p>
          <p>Rol</p>
          <p>Fecha de Registro</p>
        </div>

        <div className="border border-t-0 border-b-0">
          <RenderUsers />
        </div>
      </div>

      <CreateUser />
    </>
  );
}
