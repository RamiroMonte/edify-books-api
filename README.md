# Edify Books API

Projeto desenvolvido como exercício Take-Home.

## Autores

- [@RamiroMonte](https://github.com/RamiroMonte)

## Funcionalidades

- Estratégias de autenticação Local e JWT
- CRUD de usuários
- CRUD de livros
- CRUD de autores

## Testar o projeto

Inicie primeiramente a API. [Instruções neste link.](https://github.com/RamiroMonte/edify-books-api)

Para executar o projeto em modo de desenvolvimento, baixe o projeto com git clone, acesse a pasta do projeto, instale as dependências e execute os comandos abaixo:

Inicar o Banco de Dados com Docker

```bash
  docker-compose up -d
```

Faça o push do scheme com o prisma

```bash
  npx prisma db push
```

Faça o seed inicial

```bash
  npx prisma db seed
```

```bash
  npm run start:dev
```

Pronto! API rodando na porta 3000

Usuário Test:

```bash
{
    "email": "test@test.com",
    "password": "books123"
}
```
