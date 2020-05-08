# Procura pet

A api é construida utilizando a linguagem javascript, junto com alguns frameworks e serviços externos.

Como roteados das rotas da aplicação foi utilizado o framework [**express**](https://expressjs.com/), junto com o JWT (Json web token) para controlar e autenticar o acesso de usuários as funcionalidades do serviço. como banco de dados foi utilizado o serviço Mongodb Atlas junto com o Mongoose, e como como serviço de CDN foi utilizado o Cloudinary.

---

## User Controller

### Login
**http://domain-api/login_user**

Rota destinada ao login/autenticação do usuário

```json
//--------------REQUEST--------------
body:{
	"email": "teste@gmail.com",
	"password": "teste"
}

//--------------RESPONSE--------------
{
  "message": "Success!",
  "user": {
    "_id": "0000000000",
    "name": "teste",
    "email": "teste@gmail.com",
    "phone": "0000000000",
    "localization": "cidade teste"
  },
  "accessToken": "Bearer:token.teste.0000"
}
```

### Novo usuário
**http://domain-api/new_user**

Rota destinada ao cadastro de usuário
```json
//METHOD: POST

//--------------REQUEST--------------
Body
{
	"email": "teste@gmail.com",
	"password": "teste",
	"name": "teste",
	"phone": "00000000000",
	"localization": "cidade teset"
}

//--------------RESPONSE--------------
{
  "message": "Success!",
  "user": {
    "_id": "000000000000",
    "name": "teste2",
    "email": "teste2@gmail.com",
    "phone": "69993707070",
    "localization": "ji-paraná",
  },
  "accessToken": "Bearer:token.teste.0000"
}
```

---

## Cases Controller

### Listagem de casos

**http://domain-api/cases**

Os casso listados nesta função pertencem há sua cidade

```json
//METHOD: GET

//--------------REQUEST--------------
Query params
{
	"page": 1,
	"localization": "Ji-Paraná"
}

Header params
{
	"Authorization": "Bearer:token.teste.0000"
}

//--------------RESPONSE--------------
{
	[
	  {
	    "_id": "5eaf8341b33903347451b1e8",
	    "title": "teste caso 3",
	    "description": "teste de caso",
	    "localization": "Ji-Paraná",
	    "phone": "699404658",
	    "user_id": "000000000000"
	  },
	  {
	    "_id": "000000000000",
	    "title": "Caso teste 2",
	    "description": "este é um caso teste 2",
	    "localization": "Ji-Paraná",
	    "phone": "69993707070",
	    "user_id": "5eaf83f1b33903347451b1e9"
	  }
	]
}
```

### Criar novo caso

**http://domain-api/new_case**

Está rota é para a criação de um novo caso

```json
//METHOD: POST
//CETICO

//--------------REQUEST--------------
Body
{
	"title": "title example",
	"description": "description example"
}

Header params
{
	"Authorization": "Bearer:token.teste.0000"
}

//--------------RESPONSE--------------
{
	"message": "Success!",
	"case": {
    "_id": "5eb3636c321cb009ec68cc28",
    "title": "Caso teste 3",
    "description": "este é um caso teste 3",
    "localization": "ji-paraná",
    "phone": "69993707070",
    "user_id": "5ea8c07ccdc1d13284b59ea5",
	}
}
```

### Atualizar caso

**http://domail-api/update_case**

Está rota é especifica para atualizar um caso

```json
//METHOD: PUT

//--------------REQUEST--------------
Body
{
	"case_id": "00000000000000",
	"title": "title example",
	"description": "description example"
}

Header params
{
	"Authorization": "Bearer:token.teste.0000"
}

//--------------RESPONSE--------------
{
	"message": "Success!",
}
```

### Deletar um caso

**http://domain-api/delete_case**

Está rota é responsável por deletar um caso existente

```json
//METHOD: DELETE

//--------------REQUEST--------------
Query params
{
	"case_id": "00000000000000",
}

Header params
{
	"Authorization": "Bearer:token.teste.0000"
}

//--------------RESPONSE--------------
{
	"message": "Success!",
	"status": true
}
```

## Upload controller

### image upload

**http://domain-api/upload**

Está rota tem como função e objetivo o upload de imagens de casos,

```json
//METHOD: POST

//--------------REQUEST--------------
enctype="multipart/form-data"
Body
{
	"file": image
}

Header params
{
	"Authorization": "Bearer:token.teste.0000"
}

//--------------RESPONSE--------------
{
	"message": "Success!",
  "result": {
    "_id": "000000000000",
    "name": "image",
    "url": "http://res.cloudinary.com/aabbbcccddd/image/upload/image.jpg",
    "case_id": "5eb3a50e76804a3720859845",
    "__v": 0
  }
}
```