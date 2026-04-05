import { FormField } from "@/components/form/FormField";
import { useCreateUser } from "@/hooks/useCreateUser";
export default function CreateUserForm() {
  const {
    nombre,
    setNombre,
    email,
    setEmail,
    password,
    setPassword,
    rol,
    setRol,
    loading,
    handleSubmit,
  } = useCreateUser();
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center w-[50%] h-full gap-5 m-auto"
    >
      <FormField>
        <div className="text-[15px]">Nombre del usuario</div>
        <input
          type="text"
          value={nombre || ""}
          onChange={(e) => setNombre(e.target.value)}
          className="outline-1 rounded-sm px-2 py-1"
        />
      </FormField>

      <FormField>
        <div className="text-[15px]">Email</div>
        <input
          type="email"
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
          className="outline-1 rounded-sm px-2 py-1"
        />
      </FormField>

      <FormField>
        <div className="text-[15px]">Contraseña</div>
        <input
          type="password"
          value={password || ""}
          onChange={(e) => setPassword(e.target.value)}
          className="outline-1 rounded-sm px-2 py-1"
        />
      </FormField>

      <FormField>
        <div className="text-[15px]">Rol</div>
        <select
          name=""
          id=""
          value={rol || ""}
          onChange={(e) => {
            const value = Number(e.target.value);
            setRol(value);
          }}
          className="outline-1 rounded-sm px-2 py-1"
        >
          <option value="">Seleciona un rol</option>
          <option value="1">Admin</option>
          <option value="2">Desarrollador</option>
          <option value="3">Tester</option>
        </select>
      </FormField>

      <div className="text-center ">
        <button
          type="submit"
          disabled={loading}
          className="border px-4 py-1.5 rounded-md"
        >
          {loading ? "Creando usuario" : "Guardar"}
        </button>
      </div>
    </form>
  );
}
