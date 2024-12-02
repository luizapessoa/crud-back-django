"use client";

import React, { useState } from 'react';

interface UsuarioProps {
    id: string;
    nome: string;
    email: string;
    cpf: string;
}

export function EditarAluno({ usuario, onSave }: { usuario: UsuarioProps; onSave: (usuario: UsuarioProps) => void }) {
    const [nome, setNome] = useState(usuario.nome);
    const [email, setEmail] = useState(usuario.email);
    const [cpf, setCpf] = useState(usuario.cpf);

    function handleSave(event: React.FormEvent) {
        event.preventDefault();
        const updatedUsuario = { ...usuario, nome, email, cpf };
        onSave(updatedUsuario);
    }

    return (
        <div className="mt-10 text-center">
            <h2 className="text-2xl font-bold">Editar Dados</h2>
            <div className="mb-4">
                <label htmlFor="nome" className="block text-left">Nome:</label>
                <input
                    type="text"
                    id="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                    className="w-full p-2 mt-1 border rounded-3xl"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-left">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-2 mt-1 border rounded-3xl"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="cpf" className="block text-left">CPF:</label>
                <input
                    type="text"
                    id="cpf"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    required
                    className="w-full p-2 mt-1 border rounded-3xl"
                />
            </div>
            <form onSubmit={handleSave}>
            <button type="submit" className="px-4 py-2 font-bold text-black bg-blue-500 rounded hover:bg-blue-700">
                Salvar
            </button>
        </form>

        </div>
    );
}

export default function Usuario({ id }: UsuarioProps) {
    const [usuario, setUsuario] = useState<UsuarioProps>({
        id,
        nome: 'Nome Inicial',
        email: 'email@example.com',
        cpf: '000.000.000-00',
    });

    function handleUsuarioSave(updatedUsuario: UsuarioProps) {
        setUsuario(updatedUsuario);
        localStorage.setItem('usuario', JSON.stringify(updatedUsuario));
        alert('Dados do usuário atualizados com sucesso!');
    }

    return (
        <div>
            <h1>Usuário</h1>
            <EditarAluno usuario={usuario} onSave={handleUsuarioSave} />
        </div>
    );
}
