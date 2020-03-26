// Importando a conexão com o bd.
const connection = require('../database/connection');

// Exportando um objeto
module.exports = {

        // Listar dados tabela Ongs.    
        async index(request, response) {

            // Trabalhar com páginação, fazendo com que os registros sejam carregados gradativamente.
            // Caso a parâmetro n exista o padrão será pagina 1.
            const { page = 1 } = request.query;

            // Conta a quantidade de incidents na tabela.    
            const [count] = await connection('incidents').count();
            
            console.log(count);

            // Select na tabela ongs. 
            const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id') //Inner Join com outra tabela
            .limit(5) // Limitar os registros em 5 incidents
            .offset((page - 1) * 5) // Pega os registros de 5 em 5. 
            .select([
                'incidents.*', 
                'ongs.name', 
                'ongs.email', 
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);

            // Envia o total de incidents pelo header da resposta.
            response.header('X-Total-Count', count['count(*)']);
            
            // Retornando as informações da tabela ong e gravando no array.
            return response.json(incidents); 
        
        },

        async create(request, response) {
    
            const { title, description, value } = request.body;

            // Pega o id da Ong através do header, ou seja, da Ong que está logada no momento.    
            const ong_id = request.headers.authorization;

            //Pega o resultado da inserção que é um único id (primeiro)
            const [id] = await connection('incidents').insert({

                title,
                description,
                value,
                ong_id,

            });

            return response.json({ id }); 

        },

        async delete(request, response) {

            // Pegar o id do incident passado pelo route params.
            const { id } = request.params;

            /** 
             * É necessário pegar o id da ong para verificar se a ong que 
             * criou o incident é de fato a mesma que está querando deletar.
             * */ 
            const ong_id = request.headers.authorization;

            // Select na tabela Incident com filtro id passado pelo Route Params.
            const incident = await connection('incidents')
                .where('id', id)
                .select('ong_id')
                .first();

            // Vai verificar se a Ong que está logada é de fato a Ong que criou o Incident.    
            if(incident.ong_id !== ong_id) {
                
                // Exibe mensagem de erro caso o ong_id seja diferente.
                return response.status(401).json({ error: 'Operation not permitted.' });

            } 

            // Executa o delete da Incident conforme o id passado.
            await connection('incidents').where('id', id).delete();

            // Resposta que a operação deu certo, mas n retorna nada.    
            return response.status(204).send();

        }

};