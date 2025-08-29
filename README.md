<h1 align="center"> 📊 API de Gerenciamento Financeiro Pessoal </h1>

API para gerenciamento de finanças pessoais, desenvolvida com Node.js, Express e TypeScript, utilizando MongoDB como banco de dados, integração com a Gemini API para assitência financeira, e deploy realizado no Google Cloud. 

Essa API pode ser integrada na aplicação [Fin Shopping](finshopping.vercel.app), permitindo consultas de transações, histórico financeiro, compras e chat para assistência financeira.

---

### 📦 Instalação e Execução

1. Clone o repositório: 

   ```bash
      git clone https://github.com/rmftelier/pretalab-api
   ```

2. Acesse a pasta do projeto:

   ```bash
    cd pretalab-api
   ```

3. Instale as dependências:

    ```bash
     npm install
    ```
    
4. Crie um arquivo `.env` na raiz do projeto com as variáveis necessárias:

    ```env
     MONGO_URL=mongodb+srv://<username>:<password>@<cluster-url>/<dbname>?retryWrites=true&w=majority&appName=<appname>
     GEMINI_API_KEY=sua_chave_gemini
    ```

5. Execute em modo desenvolvimento:

    ```bash
     npm run dev
    ```

5. Para testar as rotas utilize ferramentas como: ThunderClient ou Postman e faça as requisições que desejar para testar os endpoints da API.

6. Para rodar os testes utilize o comando:

    ```bash
     npm run test
    ```

---

## 🛠 Documentação da API 
A aplicação possui os seguintes endpoints:

### 1. Produtos 

`GET /products`

Retorna todos os produtos disponíveis na loja. 
- **Método**: GET
- **Resposta de Sucesso (200 OK)**:
  ```bash
  [
    {
      "id": "1",
      "name": "Notebook Gamer Pro",
      "price": 7500
    },
    {
      "id": "2",
      "name": "Mouse Sem Fio Ultra-leve",
      "price": 350
    },
    {
      "id": "3",
      "name": "Teclado Mecânico RGB",
      "price": 550
    },
    {
      "id": "4",
      "name": "Monitor 4K 27\"",
      "price": 2500
    },
    {
       "id": "5",
      "name": "Headset 7.1 Surround",
       "price": 600
    },
    {
      "id": "6",
      "name": "Webcam Full HD",
      "price": 400
    },
    {
      "id": "7",
      "name": "SSD NVMe 1TB",
      "price": 800
    }
  ]
  ``` 

### 2. Transações Financeiras

`GET /transactions`

Retorna todas as transações financeiras cadastradas. 
- **Método**: GET
- **Resposta de Sucesso (200 OK)**:
  ```bash
  [
    {
        "id": "689a467bb11df5388c3d1e6a",
        "date": "2024-07-15T10:00:00.000Z",
        "description": "Salário de Julho",
        "amount": 5000,
        "type": "income",
        "category": "Salário"
    },
    {
        "id": "689a4687b11df5388c3d1e6c",
        "date": "2024-07-15T12:30:00.000Z",
        "description": "Aluguel",
        "amount": 1500,
        "type": "expense",
        "category": "Moradia"
    },
  ]
  ```

`GET /transactions/:id`

Retorna todas as transações financeiras cadastradas. 
- **Método**: GET
- **Parâmetros da Rota**: `id`: `string`
- **Resposta de Sucesso (200 OK)**:
  ```bash
  {
    "transaction": {
       "id": "689a467bb11df5388c3d1e6a",
       "date": "2024-07-15T10:00:00.000Z",
       "description": "Salário de Julho",
       "amount": 5000,
       "type": "income",
       "category": "Salário"
   }
  }
  ```
- **Resposta de Erro (404 NOT FOUND):
  ```bash
  {
    "message": "A transação financeira com o id informado não foi encontrada."
  }
  ```

`POST /transactions`

Cria uma nova transação financeira. 
- **Método**: POST
- **Corpo da Requisição**:
    ```bash
    {
      "date": "2024-08-02T15:00:00Z",
      "description": "Ingressos para show do BTS",
      "amount": 2500,
      "type": "expense",
      "category": "Lazer"
    }
  ``` 
- **Resposta de Sucesso (201 Created)**:
  ```bash
  {
      "message": "A Transação Financeira foi criada",
      "transaction": {
          "id": "68b10de7ae64ae1064d9d256",
          "date": "2024-08-02T15:00:00.000Z",
          "description": "Ingressos para show do BTS",
          "amount": 2500,
          "type": "expense",
          "category": "Lazer"
      }
  }
  ``` 

### 3. Compras 

`POST /checkout`

Cria uma nova compra. 
- **Método**: POST
- **Corpo da Requisição**:
    ```bash
    {
      "cart": [
         { 
            "productId": "3", 
            "quantity": 2
         }, 
         {
            "productId": "4", 
            "quantity": 3
         }
     ]
  }
  ``` 
- **Resposta de Sucesso (200 OK)**:
  ```bash
  {
    "id": "68b10a64ae64ae1064d9d23c",
    "date": "2025-08-29T02:03:16.111Z",
    "total": 8600,
    "items": [
       {
         "productId": "3",
         "quantity": 2,
         "name": "Teclado Mecânico RGB",
         "price": 550
       },
       {
         "productId": "4",
         "quantity": 3,
         "name": "Monitor 4K 27\"",
         "price": 2500
       }
   ]
  }
  ``` 
- **Resposta de Erro (400 Bad Request)**:
   - Se o total exceder R$20.000:
     ```bash
      {
          "message": "O valor total da compra excede o limite de R$20.000."
      }
     ```

`GET /purchases`

Retorna todas as compras cadastradas. 
- **Método**: GET
- **Resposta de Sucesso (200 OK)**:
  ```bash
  [
    {
      "id": "68b10a64ae64ae1064d9d23c",
      "date": "2025-08-29T02:03:16.111Z",
      "total": 8600,
      "items": [
         {
           "productId": "3",
           "quantity": 2,
           "name": "Teclado Mecânico RGB",
           "price": 550
         },
         {
           "productId": "4",
           "quantity": 3,
           "name": "Monitor 4K 27\"",
           "price": 2500
         }
     ]
    }
  ]
  ``` 

`GET /purchases/:id`

Retorna uma compra específica pelo seu ID. 
- **Método**: GET
- **Parâmetros da Rota**: `id`: `string`
- **Resposta de Sucesso (200 OK)**:
  ```bash
  {
    "purchase": {
       "id": "68b10a64ae64ae1064d9d23c",
       "date": "2025-08-29T02:03:16.111Z",
       "total": 8600,
       "items": [
          {
             "productId": "3",
             "quantity": 2,
             "name": "Teclado Mecânico RGB",
             "price": 550
          },
          {
             "productId": "4",
             "quantity": 3,
             "name": "Monitor 4K 27\"",
             "price": 2500
          }
      ]
    }
  }
  ``` 

- **Resposta de Erro (404 NOT FOUND)**:
  ```bash
  {
    "message": "Compra com o id informado não foi encontrada."
  }
  ```

---

<div align="center"> 
  <p> 💌 Desenvolvido por Roberta Meyrelles</p>
  <a href = "mailto:bertameyrelles@gmail.com"><img src="https://img.shields.io/badge/-Gmail-%23333?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
  <a href="https://www.linkedin.com/in/roberta-meyrelles" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> 
  <a href="https://github.com/rmftelier" target="_blank"><img src="https://img.shields.io/badge/github-black?style=for-the-badge&logo=github"></a>
</div>
