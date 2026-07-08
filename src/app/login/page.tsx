import LoginForm from "@/components/login/LoginForm";

export default function Login() {
  return (
    <div className="flex items-center justify-center flex-col h-screen gap-2 rounded-xl shadow-lg border border-gray-100">
      <div className="w-full max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="flex flex-col gap-2 leading-none text-center w-full">
          <h1 className="font-extrabold text-4xl tracking-tight text-gray-900">
            Bug<span className="text-blue-600">Tracker</span>
          </h1>

          <span className="text-lg text-gray-400">Iniciar Sesión</span>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
