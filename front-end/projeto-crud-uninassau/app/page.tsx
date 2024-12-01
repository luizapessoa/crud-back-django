"use client";

import ApiService from "@/services/ApiService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {

  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [formData, setFormData] = useState({ nome: "", email: "", cpf: "" });
  const { list, add } = ApiService();

  // const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await add(formData.nome, formData.email, formData.cpf);
      if (response) {
        setUsuarios((prevUsuarios) => [...prevUsuarios, response]); 
        setFormData({ nome: "", email: "", cpf: "" }); 

        const getUsuarios = async () => {
          try {
            const usuarios = await list();
            setUsuarios(usuarios);
          } catch (error) {
            console.error("Erro ao carregar usuários:", error);
          }
        };
    
        getUsuarios();
      }
    } catch (error) {
      console.error("Erro ao adicionar usuário:", error);
    }
  };

  useEffect(() => {
    const getUsuarios = async () => {
      try {
        const usuarios = await list();
        setUsuarios(usuarios);
      } catch (error) {
        console.error("Erro ao carregar usuários:", error);
      }
    };

    getUsuarios();
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <a href="/login">Login</a>
      <div className="flex gap-4">

        <table className="w-1/2 border-collapse border border-gray-300 rounded-md p-2">
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
            {usuarios.length > 0 ? (
              usuarios.map((usuario, index) => (
                <tr key={index}>
                  <td>{usuario.id}</td>
                  <td>{usuario.nome}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.cpf}</td>
                  <td>
                    <a href={`/usuario/${usuario.id}`}>Editar</a>
                    <a href={`/usuario/${usuario.id}`}>Excluir</a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>Nenhum registro encontrado</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="w-1/2 flex flex-col gap-4">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="nome"
              placeholder="Nome"
              value={formData.nome}
              onChange={handleChange}
              className="text-black w-full border-2 border-gray-300 p-2 rounded-md"
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="text-black w-full border-2 border-gray-300 p-2 rounded-md"
            />
            <input
              type="text"
              name="cpf"
              placeholder="CPF"
              value={formData.cpf}
              onChange={handleChange}
              className="text-black w-full border-2 border-gray-300 p-2 rounded-md"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
              Adicionar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
