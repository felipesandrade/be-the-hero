import axios from 'axios';

const api = axios.create({

    /** Parte padrão da URL que será mantida em todas as chamadas. */
    baseURL: 'http://localhost:3333'

});

// Permitindo que os outros arquivos consigam importar esse.
export default api;