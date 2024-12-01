from django.urls import path
from . import views

urlpatterns = [
    path('login', views.login, name='api-login'),
    path('logout/', views.logout, name='api-logout'),
    path('alunos/', views.listar_alunos, name='listar-alunos'),
    path('alunos/adicionar/', views.adicionar_aluno, name='adicionar-aluno'),
    path('alunos/<int:id>/', views.editar_aluno, name='editar-aluno'),
    path('alunos/<int:id>/excluir/', views.excluir_aluno, name='excluir-aluno'),
]
