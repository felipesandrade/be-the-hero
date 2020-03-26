// Importando as funções do Express.
const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');


// Armazenando o módulo de rotas do Express em uma nova variável.
const routes = express.Router();

// Rota para criar sessão/login.
routes.post('/sessions', SessionController.create);

// Rota Get para listar dados das Ongs.
routes.get('/ongs', OngController.index);
// Rota Post para criar/gravar ong no bd.
routes.post('/ongs', OngController.create);

// Rota Get para listar dados dos Incidents.
routes.get('/incidents', IncidentController.index);
// Rota Post para criar/gravar Incident no bd.
routes.post('/incidents', IncidentController.create);
// Rota para deletar um incident passando um rout params que é o id da rota.
routes.delete('/incidents/:id', IncidentController.delete);

// Rota Get para listar dados dos Incidents.
routes.get('/profile', ProfileController.index);


// Exportando as rotas para que sejam utilizadas no index.js.
module.exports = routes;








    // Utilizando request query para capturar os dados passados pelo usuário.
    // const params = request.query;

    // Utilizando o route parms para capturar os dados passados pelo usuário quando n se sabe o parametro.    
    // const params = request.params;

    // Utilizando body para criar ou alterar um recurso.    
    //const data = request.body;

    //console.log(data);

   // Enviando sinal para tela. 
   // return response.send('Hello World');

   // Response com Json. 
    // return response.json({

    //     evento: 'Semana OmniStack 11.0',
    //     aluno: 'Felipe Viana'

    // });