"use client";

import ApiService from "@/services/ApiService";
import { useEffect, useState } from "react";

export default function Home() {

    const [usuarios, setUsuarios] = useState<any[]>([]);
    const { list } = ApiService();

    useEffect(() => {
      const getUsuarios = async () => {
        return await list();
      }

      if(usuarios.length === 0) {
        getUsuarios().then((usuarios : any) => {
          setUsuarios(usuarios);
        });
      }
    });

    return (
        <div>
            <h1>Home</h1>
            <a href="/login">Login</a>
            <div>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>CPF</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  { usuarios.length > 0 ? 
                    usuarios.map((usuario) => (
                    <tr key={usuario.id}>
                      <td>{usuario.id}</td>
                      <td>{usuario.nome}</td>
                      <td>{usuario.email}</td>
                      <td>{usuario.cpf}</td>
                      <td>
                        <a href="/usuario/1">Editar</a>
                        <a href="/usuario/1">Excluir</a>
                      </td>
                    </tr>
                  )):(
                    <tr>
                      <td colSpan={5}>Nenhum registro encontrado</td>
                    </tr>
                  )}
                  </tbody>
              </table>
            </div>
        </div>
    );
}