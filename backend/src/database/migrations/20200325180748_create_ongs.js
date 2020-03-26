
// O método up é responsável pela criação da tabela ao executar a migration.
exports.up = function(knex) {

    return knex.schema.createTable('ongs', function (table) {
       table.string('id').primary();
       table.string('name').notNullable();
       table.string('email').notNullable();
       table.string('whatsapp').notNullable();
       table.string('city').notNullable();
       table.string('uf', 2).notNullable();
    })
  
};

// Caso ocorra algum problema dutante a criação da tabela e seja necessário desfazer.
exports.down = function(knex) {

    return knex.schema.dropTable('ongs');
  
};
