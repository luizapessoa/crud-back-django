const ApiService = () => {

    async function login(usuario: string, senha: string) {

        return await fetch("http://localhost:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ usuario, senha }),
            credentials: 'include', 
        });
    }

    async function get(id: string) {

        const response = await fetch("http://localhost:8000/alunos/" + id + "get/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include', 
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar dados: " + response.statusText);
        }
    
        return await response.json(); // Transforma a resposta em JSON
    }

    async function add(nome: string, email: string, cpf: string) {

        return await fetch("http://localhost:8000/alunos/adicionar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ nome, email, cpf }),
            credentials: 'include', 
        });
    }

    async function edit(id: string, nome: string, email: string, cpf: string) {

        return await fetch("http://localhost:8000/alunos/"+id+"/editar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ nome, email, cpf }),
            credentials: 'include', 
        });
    }

    async function remove(id: string) {

        return await fetch("http://localhost:8000/alunos/"+id+"/excluir", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include', 
        });
    }

    async function list() {

        const response = await fetch("http://localhost:8000/alunos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',  
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar dados: " + response.statusText);
        }
    
        return await response.json();
    }

    return { login, get, list, add, remove, edit };

};

export default ApiService;