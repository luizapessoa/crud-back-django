from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Aluno
from .serializers import AlunoSerializer

# Login
@api_view(['POST'])
def login(request):
    usuario = request.data.get('usuario')
    senha = request.data.get('senha')

    if usuario == "secretaria" and senha == "1234":
        request.session['usuario_logado'] = usuario
        return Response({"message": "Login realizado com sucesso"}, status=status.HTTP_200_OK)
    return Response({"error": "Usuário ou senha inválidos"}, status=status.HTTP_401_UNAUTHORIZED)

# Logout
@api_view(['POST'])
def logout(request):
    if 'usuario_logado' in request.session:
        del request.session['usuario_logado']
    return Response({"message": "Logout realizado com sucesso"}, status=status.HTTP_200_OK)

# Listar alunos
@api_view(['POST'])
def listar_alunos(request):
    # if 'usuario_logado' not in request.session:
    #     return Response({"error": "Não autenticado"}, status=status.HTTP_401_UNAUTHORIZED)

    alunos = Aluno.objects.all()
    serializer = AlunoSerializer(alunos, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

# Adicionar aluno
@api_view(['POST'])
def adicionar_aluno(request):
    if 'usuario_logado' not in request.session:
        return Response({"error": "Não autenticado"}, status=status.HTTP_401_UNAUTHORIZED)

    serializer = AlunoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Editar aluno
@api_view(['GET', 'PUT'])
def editar_aluno(request, id):
    if 'usuario_logado' not in request.session:
        return Response({"error": "Não autenticado"}, status=status.HTTP_401_UNAUTHORIZED)

    try:
        aluno = Aluno.objects.get(id=id)
    except Aluno.DoesNotExist:
        return Response({"error": "Aluno não encontrado"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = AlunoSerializer(aluno)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = AlunoSerializer(aluno, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Excluir aluno
@api_view(['DELETE'])
def excluir_aluno(request, id):
    if 'usuario_logado' not in request.session:
        return Response({"error": "Não autenticado"}, status=status.HTTP_401_UNAUTHORIZED)

    try:
        aluno = Aluno.objects.get(id=id)
    except Aluno.DoesNotExist:
        return Response({"error": "Aluno não encontrado"}, status=status.HTTP_404_NOT_FOUND)

    aluno.delete()
    return Response({"message": "Aluno excluído com sucesso"}, status=status.HTTP_204_NO_CONTENT)
