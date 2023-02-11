
## Getting Started

Nome do projeto: All Product Project

Descrição: Projeto consiste em 4 telas (página de login, página principal onde tem uma lista de produtos, página onde possui um relatório que é buscado da API e página de pdf onde exibe uma tabela com o relatório da tela anterior).
Projeto foi construido usando as seguintes técnologias: ReactJs, NextJs, Typescript, Axios, Chakra-ui, React-icons e React-pdf.
Projeto consome uma API fake (json server).

Link: 


```bash
Usuários criados: {
    {
      "email": "bruno@email.com",
      "password": "bruno",
      "isAdmin": true
    },
    {
      "email": "techie@email.com",
      "password": "techie",
      "isAdmin": false
    },
    {
      "email": "nilson@email.com",
      "password": "nilson",
      "isAdmin": false
    }
}
```

# Páginas:

- ## Login(rota: link/login): 
- ### Features: Foi criado uma página de login totalmente responsiva com 2 inputs (primeiro: email, segundo: password) com todas as seguintes validações:
- Campo obrigatório (se deixar algum campo vazio, uma mensagem de erro aparecerá abaixo dos inputs)
- Login ou senha (se o usuário errar login ou senha, uma mensagem de erro aparecerá abaixo dos inputs)
- Loading no botão de login.



- ## Lista de Produtos(rota: link/): 
- ### Features: Foi criado uma página de lista de produtos totalmente responsiva com *header(Possui um texto dizendo o total de produtos e um botão para deslogar), *tabela com a lista de produtos(A lista possui ordenação nos titúlos e paginação totalmente dinamico consumida pela api), *Botão para acessar relatório(Somente usuário que for admin possui acesso a esse botão)



- ## Relatório(rota: link/report-product)**Somente usuário Admin pode acessar essa rota: 
- ### Features: Foi criado uma página de relatório de produto totalmente responsiva com *header(Possui um texto dizendo a quantidade total de produto e um botão para deslogar), *tabela com a lista do relatório vinda da API(não possui ordenação e paginação), *Botão para gerar o relatório em pdf(irá encaminhar o usuário para a tela de pdf com os dados do relatório)




- ## PDF(rota: link/pdf)**Somente usuário Admin pode acessar essa rota: 
- ### Features: Foi criado uma página de pdf com os dados da tela de relatório.





For devs:  run the development server: 

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.




