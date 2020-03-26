// Importando o pacote Knex para conexao com o bd.
const knex = require('knex');

// Importando a configuração do pacote Knex;
const configuration = require('../../knexfile');

// Chamar o knex passando como parâmetro a configuração do tipo development.
const connection = knex(configuration.development);

// Exportar a conexão com banco de dados.
module.exports = connection;





