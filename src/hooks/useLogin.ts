import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { loginSchema } from "@/schemas/auth.schema";

export function useLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    const apiURL = process.env.NEXT_PUBLIC_API_URL_LOGIN;
    e.preventDefault();

    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const error = result.error.issues[0].message;
      toast.error(error);
      return;
    }

    try {
      if (!apiURL) return;
      setLoading(true);

      const res = await fetch(apiURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      console.log(data);
      if (!res.ok) {
        toast.error(data.errors || "Credenciales incorrectas");
        return;
      }
      setEmail(data.email);
      setPassword(data.password);

      toast.success(`Bienvenido ${data.success}`);

      router.push("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Ocurrió un error al conectarse con el servidor");
      }
    } finally {
      setLoading(false);
    }
  };
  return { email, setEmail, password, setPassword, loading, handleSubmit };
}
