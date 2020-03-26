// Importando as funcionalidade do Express (Utilizado para tratar as rotas e recursos)
const express = require('express');

// Importando o módulo de segurança da nossa aplicação.
const cors = require('cors');

// Importando as rotas do arquivo routes.js. "./" Referenciar o arquivo dentro da mesma pasta do arquivo index.js
const routes = require('./routes');

//Instanciando a aplicação
const app = express();

// Usando o módulo Cors
app.use(cors());

// app.use(cors({

//     origin: 'http://endereco_que_pode_acessar_nossa_aplicacao'

// }));

// Informando que estamos utilizando json para o corpo das requisições. Deve vir antes das rotas.
app.use(express.json());

// Esse código deve ser abaixo do json.
app.use(routes);

app.listen(3333);

//Criando uma rota

/**
* Rota / Recurso
*/

/**
* Métodos HTTP
* 
* GET: Buscar/Listar uma informação do back-end.
* POST: Criar una informação no back-end. 
* PUT: Alterar uma informação no back-end.
* DELETE: Deletar uma informação no back-end. 
*/

/**
 * Tipos de Parâmetros
 * 
 * Query Parms: parâmetros nomeados enviados na rota após "?" (Filtros, Paginação) podendo passar vários parâmetros com o 
 * simbolo de "&".
 * 
 * Route Parms: parâmetros identificados para identificar recursos (Quando for 
 * utilizar route parms é necessário utilizar o ":".)
 * 
 * Request Body: corpo da requisição, utilizado para criar ou alterar recursos.   
 * 
 */

 /**
  * SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
  * 
  * NoSQL: MongoDB, CouchDB, etc
  */

  /**
   * 
   * Driver: SELECT * FROM users;
   * 
   * Query Builder: table('users').select('*').where
   * 
   */



//Informar que a aplicação irá escutar na porta 3333.
