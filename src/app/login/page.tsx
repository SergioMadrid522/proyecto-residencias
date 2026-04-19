import LoginForm from "@/components/login/LoginForm";

export default function Login() {
  return (
    <div className="flex items-center justify-center flex-col h-screen gap-2 rounded-xl shadow-lg border border-gray-100">
      <div className="w-full max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Iniciar Sesión</h2>
          <p className="text-sm text-gray-500 mt-2">
            Ingresa tus credenciales para acceder al sistema
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
