"use client";

import ApiService from "@/services/ApiService";
import { useEffect, useState } from "react";
import { Header } from "@/components/header"; 
import { Footer } from "@/components/footer";


import { Loading } from "@/components/layout/Loading";

export default function Home() {
 
  const [loading, setLoading]   = useState(false);
  const [usuarios, setUsuarios] = useState<Record<string>[]>([]);
  const [formData, setFormData] = useState({ nome: "", email: "", cpf: "" });

  const { list, add, remove } = ApiService();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(formData.nome === "" || formData.email === "" || formData.cpf === "")
    {
      alert("Preencha todos os campos!");
      return;
    }

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

  const handleRemove = async (id: string) => {
    try {
      const response = await remove(id);
      if (response) {
        const usuarios = await list();
        setUsuarios(usuarios);
      }
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  };

  useEffect(() => {

    setLoading(true);

    const getUsuarios = async () => {
      try {
        const usuarios = await list();
        setUsuarios(usuarios);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar usuários:", error);
      }
    };

    getUsuarios();
  }, []);

  return (
    <>
    { loading ? <Loading /> : (
      <div className="p-2">
        <Header />
      <h1 className="text-3xl font-bold pb-10">Gerenciador de alunos</h1>
      
      <div className="flex gap-4">

        <section className="w-full md:w-1/2 overflow-y-scroll max-h-screen bg-white shadow-md rounded-lg p-6 border border-gray-200">
          <h2 className="text-xl font-bold mb-4 text-gray-700">Lista de alunos</h2>
          <table className="w-full border-collapse border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 text-left text-sm font-medium text-gray-600">ID</th>
                <th className="border border-gray-300 p-2 text-left text-sm font-medium text-gray-600">Nome</th>
                <th className="border border-gray-300 p-2 text-left text-sm font-medium text-gray-600">Email</th>
                <th className="border border-gray-300 p-2 text-left text-sm font-medium text-gray-600">CPF</th>
                <th className="border border-gray-300 p-2 text-left text-sm font-medium text-gray-600">Ação</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.length > 0 ? (
                usuarios.map((usuario, index) => (
                  <tr key={index} className="even:bg-gray-50 hover:bg-gray-100">
                    <td className="border border-gray-300 p-2 text-sm text-gray-700">{usuario.id}</td>
                    <td className="border border-gray-300 p-2 text-sm text-gray-700">{usuario.nome}</td>
                    <td className="border border-gray-300 p-2 text-sm text-gray-700">{usuario.email}</td>
                    <td className="border border-gray-300 p-2 text-sm text-gray-700">{usuario.cpf}</td>
                    <td className="border border-gray-300 p-2 text-sm text-gray-700">
                      <a
                        href={`/usuario/${usuario.id}`}
                        className="text-blue-500 hover:underline mr-2"
                      >
                        Editar
                      </a>
                      <span
                        className="text-red-500 hover:underline cursor-pointer"
                        onClick={() => handleRemove(usuario.id)}
                      >
                        Excluir
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="border border-gray-300 p-4 text-center text-sm text-gray-500"
                  >
                    Nenhum registro encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
        
        <section className="w-full md:w-1/2 bg-white shadow-md rounded-lg p-6 border border-gray-200 flex flex-col gap-6">
          <h2 className="text-xl font-bold text-gray-700">Adicionar Aluno</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="nome"
              placeholder="Nome"
              value={formData.nome}
              onChange={handleChange}
              className="text-black w-full border border-gray-300 focus:ring-2 focus:ring-blue-400 p-3 rounded-md shadow-sm"
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="text-black w-full border border-gray-300 focus:ring-2 focus:ring-blue-400 p-3 rounded-md shadow-sm"
            />
            <input
              type="text"
              name="cpf"
              placeholder="CPF"
              value={formData.cpf}
              onChange={handleChange}
              className="text-black w-full border border-gray-300 focus:ring-2 focus:ring-blue-400 p-3 rounded-md shadow-sm"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold p-3 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Adicionar
            </button>
          </form>
        </section>
        
      </div>
      
    </div>
    )}
    </>
   
  );
  
}
