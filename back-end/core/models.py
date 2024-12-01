from django.db import models

class Aluno(models.Model):
    nome = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    cpf = models.CharField(max_length=11, unique=True)

    def __str__(self):
        return self.nome