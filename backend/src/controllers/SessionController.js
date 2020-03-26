const connection = require('../database/connection');

module.exports = {

    async create(request, response) {

        const { id } = request.body;

        const ong = await connection('ongs')
        .where('id', id)
        .select('name')
        .first(); // Como a busca é por id, só retornará 1 resultado. Portanto, utilizamos o first para n retornar um array.  

        if(!ong) {

            return response.status(400).json({ error: 'No ONG found with this ID'}); 

        }

        return response.json(ong);

    } 

}