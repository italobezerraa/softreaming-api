<h1 align="center"> softreaming-api </h1>

<p align="center">
Projeto em desenvolvimento. 
</p>

## 📑 Sobre o projeto

Este projeto consiste em uma API de gerenciamento de filmes e usuários. Os usuários da aplicação podem fazer um cadastro, criar até três perfis pessoais e alterar ou excluir esses perfis a qualquer momento. Cada perfil contém informações como nome, sobrenome e idade.

Cada filme possui atributos como título, gênero, ano de lançamento e sinopse. O super usuário pode criar, buscar, listar e filtrar os filmes do banco de dados.

Além disso, o super usuário tem a capacidade de excluir qualquer usuário da aplicação. Isso permite que o super usuário mantenha o controle sobre o conteúdo e os usuários da aplicação.

## 🚀 Tecnologias

Esse projeto está sendo desenvolvido com as seguintes tecnologias:

- ✔️ TypeScript
- ✔️ Docker
- ✔️ PostgreSQL
- ✔️ TypeORM
- ✔️ NodeJS
- ✔️ JWT
- ✔️ Bcrypt

## 💾 Requisitos para rodar o projeto

- Node.js
- Yarn
- PostgresSQL ou Docker com uma imagem PostgresSQL

## 💻 Comandos para rodar o projeto

**Clone o projeto e abra a pasta no VSCODE**

```bash
$ git clone https://github.com/italobezerraa/softreaming-api
```

**Com o código aberto no VCODE siga o passo a passo abaixo**

```bash
# Instalar as dependências
$ yarn

# Criar uma instância do PostgresSQL usando o Docker
$  docker run --name softreaming-database -e POSTGRES_PASSWORD=softreaming -p 5432:5432 -d postgres

# Gerar as migrations
$ yarn migration:run

# Rodar o projeto
$ yarn dev

# Com isso o projeto deve estar funcionando perfeitamente!
```
