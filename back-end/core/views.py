from django.shortcuts import render, redirect
from .models import Aluno

# Função para verificar se o usuário está logado
def verificar_login(request):
    # Verifica se o usuário está logado (se a chave 'usuario_logado' existe na sessão)
    if 'usuario_logado' not in request.session:
        return redirect('login')  # Se não estiver logado, redireciona para login
    return None  # Se estiver logado, retorna None (continua normalmente)

# Função de login
def login(request):
    if request.method == 'POST':
        usuario = request.POST.get('usuario')
        senha = request.POST.get('senha')

        # Verificar se o usuário e senha são "secretaria" e "1234"
        if usuario == "secretaria" and senha == "1234":
            request.session['usuario_logado'] = usuario  # Guarda o usuário na sessão
            return redirect('home')  # Redireciona para a página inicial
        else:
            return render(request, "login.html", {"erro": "Usuário ou senha inválidos"})
    return render(request, "login.html")

# Página inicial (home)
def home(request):
    # Verifica o login antes de continuar
    if verificar_login(request):
        return verificar_login(request)  # Se não estiver logado, redireciona para login
    
    alunos = Aluno.objects.all()
    return render(request, "index.html", {"alunos": alunos})

# Função para salvar dados de alunos
def salvar(request):
    # Verifica o login antes de continuar
    if verificar_login(request):
        return verificar_login(request)  # Se não estiver logado, redireciona para login
    
    nome = request.POST.get("nome")
    email = request.POST.get("email")
    cpf = request.POST.get("cpf")

    Aluno.objects.create(nome=nome, email=email, cpf=cpf)
    alunos = Aluno.objects.all()
    return render(request, "index.html", {"alunos": alunos})

# Função para editar dados de alunos
def editar(request, id):
    # Verifica o login antes de continuar
    if verificar_login(request):
        return verificar_login(request)  # Se não estiver logado, redireciona para login
    
    aluno = Aluno.objects.get(id=id)
    return render(request, "update.html", {"aluno": aluno})

# Função para alterar dados de alunos
def alterar(request, id):
    # Verifica o login antes de continuar
    if verificar_login(request):
        return verificar_login(request)  # Se não estiver logado, redireciona para login
    
    novoNome = request.POST.get("nome")
    novoEmail = request.POST.get("email")
    novoCPF = request.POST.get("cpf")
    aluno = Aluno.objects.get(id=id)
    aluno.nome = novoNome
    aluno.email = novoEmail
    aluno.cpf = novoCPF
    aluno.save()
    return redirect(home)

# Função para excluir dados de alunos
def excluir(request, id):
    # Verifica o login antes de continuar
    if verificar_login(request):
        return verificar_login(request)  # Se não estiver logado, redireciona para login
    
    aluno = Aluno.objects.get(id=id)
    aluno.delete()
    return redirect(home)

# Função para fazer logout
def logout(request):
    # Limpa a chave 'usuario_logado' da sessão
    if 'usuario_logado' in request.session:
        del request.session['usuario_logado']
    return redirect('login')
