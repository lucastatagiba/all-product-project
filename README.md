
## Getting Started

Nome do projeto: All Product Project

Descrição: Projeto consiste em 4 telas (página de login, página principal onde tem uma lista de produtos, página onde possui um relatório que é buscado da API e página de pdf onde exibe uma tabela com o relatório da tela anterior).
Projeto foi construido usando as seguintes técnologias: ReactJs, NextJs, Typescript, Axios, Chakra-ui, React-icons e React-pdf.
Projeto consome uma API fake (json server).

- ## Features de rota: 
- dados do usuário logado estão sendo salvos no localstorage, então uma vez logado mesmo que fecha e abra a página, o login continua salvo.
- Se o usuário estiver deslogado ele não consegue acessar nenhuma rota (uma mensagem aparecerá, pedindo para o mesmo efetuar login).
- Se o usuário estiver logado em qualquer rota, se ele tentar ir para a rota de login, ele será redirecionado para a rota principal '/'.
- Se o token do usuário expirar (expira em 1 hora), ao tentar acessar qualquer rota existente ele será redirecionado para o login com um token avisando-o da expiração do token. 
- Se o usuário tentar acessar uma rota inexistente, ele será redirecionado para uma tela personalizada de erro.

Link: https://all-product-project-1wdzeshy8-lucastatagiba.vercel.app/login


```bash
Usuários criados: {
    {
      "email": "bruno@email.com",
      "password": "bruno",
      "isAdmin": true // Usuário admin
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

- ## Login(rota: [(https://all-product-project-1wdzeshy8-lucastatagiba.vercel.app/login)](https://all-product-project-1wdzeshy8-lucastatagiba.vercel.app/login)): 
- ### Features: Foi criado uma página de login totalmente responsiva com 2 inputs (primeiro: email, segundo: password) com todas as seguintes validações:
- Campo obrigatório (se deixar algum campo vazio, uma mensagem de erro aparecerá abaixo dos inputs)
- Login ou senha (se o usuário errar login ou senha, uma mensagem de erro aparecerá abaixo dos inputs)
- Loading no botão de login.



- ## Lista de Produtos(rota: [(https://all-product-project-1wdzeshy8-lucastatagiba.vercel.app/)](https://all-product-project-1wdzeshy8-lucastatagiba.vercel.app/)): 
- ### Features: Foi criado uma página de lista de produtos totalmente responsiva com *header(Possui um texto dizendo o total de produtos e um botão para deslogar), *tabela com a lista de produtos(A lista possui ordenação nos titúlos e paginação totalmente dinamico consumida pela api), *Botão para acessar relatório(Somente usuário que for admin possui acesso a esse botão)



- ## Relatório(rota: [(https://all-product-project-1wdzeshy8-lucastatagiba.vercel.app/report-product)](https://all-product-project-1wdzeshy8-lucastatagiba.vercel.app/report-product))**Somente usuário Admin pode acessar essa rota: 
- ### Features: Foi criado uma página de relatório de produto totalmente responsiva com *header(Possui um texto dizendo a quantidade total de produto e um botão para deslogar), *tabela com a lista do relatório vinda da API(não possui ordenação e paginação), *Botão para gerar o relatório em pdf(irá encaminhar o usuário para a tela de pdf com os dados do relatório)




- ## PDF(rota: [(https://all-product-project-1wdzeshy8-lucastatagiba.vercel.app/pdf)](https://all-product-project-1wdzeshy8-lucastatagiba.vercel.app/pdf))**Somente usuário Admin pode acessar essa rota: 
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




