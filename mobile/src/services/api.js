import axios from 'axios';

const api = axios.create({
    //Inserir o IP e a Porta que está sendo utilizada no Node.js
    baseURL: 'http://192.168.1.109:3333'

});

export default api;