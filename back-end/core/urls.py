from django.urls import path
from . import views

urlpatterns = [
    path('', views.login, name='login'),  # Página de login
    path('/home/', views.home, name='home'),  # Página inicial
    path('/salvar/', views.salvar, name='salvar'),  # Função para salvar alunos
    path('/editar/<int:id>/', views.editar, name='editar'),  # Função para editar alunos
    path('/alterar/<int:id>/', views.alterar, name='alterar'),  # Função para alterar dados de alunos
    path('/excluir/<int:id>/', views.excluir, name='excluir'),  # Função para excluir alunos
    path('/logout/', views.logout, name='logout'),  # Função de logout
]
