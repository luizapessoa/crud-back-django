"use client";

import { use } from "react";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ApiService from '@/services/ApiService';

export default function Aluno({ params }: { params: Promise<{ id: string }> }) {

    const router = useRouter();

    const { id }  = use(params);
    const { get, edit } = ApiService();

    const [formData, setFormData] = useState({ nome: "", email: "", cpf: "" });

    async function handleSave(event: React.FormEvent) {
        event.preventDefault();
        
        const response = await edit(id, formData.nome, formData.email, formData.cpf);

        if (response) {
            router.push('/');
        }
    }

    useEffect(() => {
        const getDadosAluno = async () => {
            try {
                const dados = await get(id);
                setFormData(dados);
            } catch (error) {
                console.error("Erro ao carregar dados do aluno:", error);
            }
        };
    
        getDadosAluno();
    }, []);

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">Editar Dados</h2>
            <form onSubmit={handleSave} className="space-y-4">
                <div className="mb-4">
                <label htmlFor="nome" className="block text-sm font-medium text-gray-600 mb-1">
                    Nome:
                </label>
                <input
                    type="text"
                    id="nome"
                    value={formData.nome}
                    onChange={(e) =>
                    setFormData({ ...formData, nome: e.target.value })
                    }
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700 shadow-sm"
                />
                </div>
                <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
                    Email:
                </label>
                <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700 shadow-sm"
                />
                </div>
                <div className="mb-4">
                <label htmlFor="cpf" className="block text-sm font-medium text-gray-600 mb-1">
                    CPF:
                </label>
                <input
                    type="text"
                    id="cpf"
                    value={formData.cpf}
                    onChange={(e) =>
                    setFormData({ ...formData, cpf: e.target.value })
                    }
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700 shadow-sm"
                />
                </div>
                <div className="flex w-full justify-between">
                    <a href='/' className="px-6 py-3 font-semibold text-black bg-white rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition duration-300">
                        Voltar
                    </a>
                    <button
                        type="submit"
                        className="px-6 py-3 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition duration-300"
                    >
                        Salvar
                    </button>
                </div>
            </form>
        </div>
    );
}
