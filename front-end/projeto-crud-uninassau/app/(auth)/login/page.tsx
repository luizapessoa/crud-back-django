"use client";

import ApiService from "@/services/ApiService";

export default function Login() {

    const { login } = ApiService();

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={(e) => {
                e.preventDefault();
                const usuario = e.target.usuario.value;
                const senha = e.target.senha.value;

                login(usuario, senha).then((response) => {
                    if (response.ok) {
                        console.log(response.json());
                    }
                }).then((usuario) => {
                    console.log(usuario);
                });
            }}>
                <input type="text" name="usuario" placeholder="Usuário" />
                <input type="password" name="senha" placeholder="Senha" />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}