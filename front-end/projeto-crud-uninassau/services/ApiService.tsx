const ApiService = () => {

    async function login(usuario: string, senha: string) {

        return await fetch("http://localhost:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ usuario, senha }),
            credentials: 'include', // Inclui cookies
        });
    }

    async function add(nome: string, email: string, cpf: string) {

        return await fetch("http://localhost:8000/alunos/adicionar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ nome, email, cpf }),
            credentials: 'include', // Inclui cookies
        });
    }

    async function list() {

        try {
            const response = await fetch('http://localhost:8000/alunos', {
              method: 'POST', // A API foi configurada para o método POST
              headers: {
                'Content-Type': 'application/json',
              },
            });
        
            if (!response.ok) {
              throw new Error(`Erro ao buscar alunos: ${response.statusText}`);
            }
        
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    return { login, list, add };

};

export default ApiService;