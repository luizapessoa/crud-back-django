"use client";

import { useRouter } from "next/navigation";
import { Header } from "@/components/header";

export default function Login() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = document.getElementById("Usuario") as HTMLInputElement;
    const senha = document.getElementById("Senha") as HTMLInputElement; // Obter os campos de usuário e senha por ID

    if (user.value !== "secretaria") {
      alert("Digite um nome de usuário válido");
      return;
    }
    if (senha.value !== "1234") {
      alert("Digite uma senha válida");
      return;
    }

    alert("Login bem-sucedido");

    router.push("/");
  };
  return (
    <div>
      <Header />
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          id="Usuario" 
          placeholder="Usuário"
          className="text-black w-full border-2 border-gray-300 p-2 rounded-md"
        />
        <input
          type="password"
          id="Senha" 
          placeholder="Senha"
          className="text-black w-full border-2 border-gray-300 p-2 rounded-md"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
}
