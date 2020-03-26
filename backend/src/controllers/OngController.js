// Importar o arquivo connections para comunicação com o bd.
const connection = require('../database/connection');

// Importando o pacote Crypto.
const crypto = require('crypto');

module.exports = {

    // Listar dados tabela Ongs.    
    async index(request, response) {

        // Select na tabela ongs.
        const ongs = await connection('ongs').select('*');
        
        // Retornando as informações da tabela ong e gravando no array.
        return response.json(ongs); 
    
    },

    // Criar uma ong na tabela Ongs.    
    async create(request, response) {

        const {name, email, whatsapp, city, uf} = request.body;
            
        // A ideia é gerar um id para cada ong de forma automatizada, utilizando uma função do pacote Crypto.
        const id = crypto.randomBytes(4).toString('HEX');

        // Insersão de dados na tabela Ongs.   
        // await -> irá aguardar o insert ser executado para continuar. 
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        });

        return response.json({ id });

    }
};