"use client";

import { useRouter } from "next/navigation";
import ApiService from "@/services/ApiService";

export default function Login() {

    const { login } = ApiService();

    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        
        e.preventDefault();

        const usuario = e.target.usuario.value;
        const senha = e.target.senha.value;

        login(usuario, senha).then((response) => {
            if (response.ok) {
                console.log(response.json());
            }
        }).then((usuario) => {
            console.log(usuario);
            router.push('/');
        });
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="usuario" placeholder="Usuário" className="text-black w-full border-2 border-gray-300 p-2 rounded-md" />
                <input type="password" name="senha" placeholder="Senha" className="text-black w-full border-2 border-gray-300 p-2 rounded-md" />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}