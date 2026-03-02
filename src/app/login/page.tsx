export default function Login() {
  return (
    <div className="flex items-center justify-center flex-col h-screen gap-2">
      <div className="text-3xl font-sans">
        <h1>Iniciar Sesión</h1>
      </div>

      <div className="border border-white/60">
        <form action="" className="flex flex-col gap-3 border border-white/75">
          <div className="flex items-center">
            <div className="absolute text-[15px]">Correo</div>
            <input
              type="text"
              className="relative outline outline-gray-400 rounded-sm z-10 p-1"
            />
          </div>

          <div className="flex items-center">
            <div className="absolute text-[15px]">Contraseña</div>
            <input
              type="password"
              className="relative outline outline-gray-400 rounded-sm z-10 p-1"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
