const ApiService = () => {

    function login(usuario: string, senha: string) {

        return fetch("http://localhost:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ usuario, senha }),
            credentials: 'include', // Inclui cookies
        });
    }

    function list() {

        return fetch("http://localhost:8000/home", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include', // Inclui cookies
        });
    }

    return { login, list };

};

export default ApiService;